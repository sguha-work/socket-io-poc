const Car = require('./../models/car');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
    Query: {
        getCars: async () => {
            return await Car.find();
        }
    },
    Mutation: {
        createCar: async (parent, args, context, info) => {
            let car = new Car({
                carNumber: args.car.carNumber,
                carImage: args.car.carImage,
                carName: args.car.carName,
                basePrice: args.car.basePrice,
                addedBy: args.car.addedBy,
                currentBid: args.car.currentBid,
                currentHighestBidder: args.car.currentHighestBidder
            });
            let result;
            try {
                result = await car.save();
            } catch (error) {
                console.error('Unable to save car info', error);
            }
            return { ...result._doc };
        },
        updateBidPrice: async (parent, args, context, info) => {
            const { id, currentBid } = args;
            const car = await Car.findByIdAndUpdate(id, { currentBid }, { new: true });
            pubsub.publish('BID_ENTERED', {
                bidEntered: car
            });
            return car;
        }
    },
    Subscription: {
        bidEntered: {
            subscribe: () => {
                return pubsub.asyncIterator('BID_ENTERED');
            }
        }
    }
};
module.exports = resolvers;