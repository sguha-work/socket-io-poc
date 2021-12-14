const graphql = require('graphql');
const Car = require('../models/car');
const User = require('../models/user');

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
        carName: { type: GraphQLString },
        basePrice: { type: GraphQLFloat },
        addedBy: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.addedBy);
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
        car: {
            type: new GraphQLList(CarType),
            resolve(parent, args) {
                return Car.find({ userId: parent.id });
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


//Very similar to RootQuery helps user to add/update to the database.
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                //GraphQLNonNull make these field required
                email: { type: new GraphQLNonNull(GraphQLString), unique: true },
                // age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let user = new User({
                    email: args.email
                });
                return user.save();
            }
        },
        addCar: {
            type: CarType,
            args: {
                carName: { type: new GraphQLNonNull(GraphQLString) },
                baseprice: { type: new GraphQLNonNull(GraphQLFloat) },
                addedBy: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let car = new Car({
                    carName: args.carName,
                    basePrice: args.baseprice,
                    addedBy: args.addedBy
                })
                return car.save()
            }
        }
    }
});


//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});