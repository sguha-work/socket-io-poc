const graphql = require('graphql');
const Car = require('../models/car');
const User = require('../models/user');

const Auction = require('../models/auction');

// const pubsub = require('./pubsub');
// const { subscriptions } = require('./pubsub');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const {
    GraphQLObjectType, GraphQLString,
    GraphQLID, GraphQLInt, GraphQLSchema, GraphQLFloat,
    GraphQLList, GraphQLNonNull
} = graphql;

//Schema defines data on the Graph like object types(car type), relation between 
//these object types and describes how it can reach into the graph to interact with 
//the data to retrieve or mutate the data   


const CarType = new GraphQLObjectType({
    name: 'Car',
    fields: () => ({
        id: { type: GraphQLID },
        carNumber: { type: GraphQLString },
        carImage: { type: GraphQLString },
        carName: { type: GraphQLString },
        basePrice: { type: GraphQLFloat },
        currentBid: { type: GraphQLFloat },
        currentHighestBidder: {
            type: UserType,
            resolve(parent, args) {
                if (parent.currentHighestBidder) return User.findById(parent.currentHighestBidder);
            }
        },
        addedBy: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.addedBy);
            }
        },
        auctionBids: {
            type: new GraphQLList(AuctionType),
            resolve(parent, args) {
                return Auction.find({ carId: parent.id });
            }
        }
    })
})



const UserType = new GraphQLObjectType({
    name: 'User',
    //We are wrapping fields in the function as we dont want to execute this ultil 
    //everything is inilized. For example below code will throw error CarType not 
    //found if not wrapped in a function
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString, unique: true },
        password: { type: GraphQLString },
        car: {
            type: new GraphQLList(CarType),
            resolve(parent, args) {
                return Car.find({ addedBy: parent.id });
            }
        }
    })
});


const AuctionType = new GraphQLObjectType({
    name: 'Auction',
    fields: () => ({
        id: { type: GraphQLID },
        car: {
            type: CarType,
            resolve(parent, args) {
                return Car.findById(parent.carId);
            }
        },
        bidValue: { type: GraphQLFloat },
        // basePrice: { type: GraphQLFloat },
        bidder: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.bidderId);
            }
        }
    })
});


//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all users, get all cars, get a particular 
//car or get a particular user.


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        car: {
            type: CarType,
            //argument passed by the user while making the query
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the car with id passed in argument 
                //by the user
                return Car.findById(args.id);
            }
        },
        cars: {
            type: new GraphQLList(CarType),
            resolve(parent, args) {
                return Car.find({});
            }
        },

        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        }
    }
});

const bidUpdated = 'bidUpdated';

const Subscription = new GraphQLObjectType({
    name: "Subscription",
    description: "subscriptions description",
    fields: () => ({
        submitBid: {
            type: new GraphQLList(AuctionType),

            subscribe: () => pubsub.asyncIterator("bidUpdated"),
            resolve: async (body, args, context, info) => {
                // get all allies and inform them that the house is diabled i.e became extinct. Here i am simply resturning the event body.
                console.log("body newBid", body);
                console.log("args newBid", args);

                return Auction.find({});
            }
        }
    })
})




//Very similar to RootQuery helps user to add/update to the database.
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                //GraphQLNonNull make these field required
                email: { type: new GraphQLNonNull(GraphQLString), unique: true },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let user = new User({
                    email: args.email,
                    password: args.password
                });
                return user.save();
            }
        },
        addCar: {
            type: CarType,
            args: {
                carName: { type: new GraphQLNonNull(GraphQLString) },
                carNumber: { type: new GraphQLNonNull(GraphQLString) },
                carImage: { type: new GraphQLNonNull(GraphQLString) },
                baseprice: { type: new GraphQLNonNull(GraphQLFloat) },
                addedBy: { type: new GraphQLNonNull(GraphQLID) },
                currentHighestBidder: { type: new GraphQLNonNull(GraphQLID) },
                currentBid: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve(parent, args) {
                let car = new Car({
                    carName: args.carName,
                    basePrice: args.baseprice,
                    addedBy: args.addedBy
                })

                return car.save();
            }
        },
        submitBid: {
            type: AuctionType,
            args: {
                carId: { type: new GraphQLNonNull(GraphQLString) },
                bidderId: { type: new GraphQLNonNull(GraphQLString) },
                bidValue: { type: new GraphQLNonNull(GraphQLFloat) },
            },
            async resolve(parent, args) {
                let auctionBid = {
                    carId: args.carId,
                    bidderId: args.bidderId,
                    bidValue: args.bidValue
                };
                // console.log(auctionBid);
                // pubsub.publish('Auction', {Link: {mutation: 'CREATED', node: auctionBid}});
                
                let xx =  await Auction.findOneAndUpdate({ carId: auctionBid.carId, bidderId: auctionBid.bidderId }, auctionBid, { upsert: true });
                pubsub.publish("bidUpdated", xx);
                console.log("xx", xx);
                return xx;
                // return auctionBid.save();

            }
        }
    }
});


//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,

    subscription: Subscription
});