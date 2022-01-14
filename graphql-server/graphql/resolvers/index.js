const Car = require('./../../models/car');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();
module.exports = {
    cars: async (args) => {
        let result = await Car.find();
        return result.map((dataChunk) => {
            return { ...dataChunk._doc };
        });
    },
    createCar: async (args) => {
        // let car = {
        //     _id: Math.random().toString(),
        //     carNumber: args.carinput.carNumber,
        //     carImage: args.carinput.carImage,
        //     carName: args.carinput.carName,
        //     basePrice: args.carinput.basePrice,
        //     addedBy: args.carinput.addedBy,
        //     currentBid: args.carinput.currentBid,
        //     currentHighestBidder: args.carinput.currentHighestBidder
        // }
        let car = new Car({
            carNumber: args.carinput.carNumber,
            carImage: args.carinput.carImage,
            carName: args.carinput.carName,
            basePrice: args.carinput.basePrice,
            addedBy: args.carinput.addedBy,
            currentBid: args.carinput.currentBid,
            currentHighestBidder: args.carinput.currentHighestBidder
        });
        let result;
        try {
            result = await car.save();
        } catch (error) {
            console.error('Unable to save car info', error);
        }
        return { ...result._doc };
    },
    bidEntered: {
        subscribe: () => {
            pubsub.asyncIterator('bid_entered');
            console.log('bid entered called');
            pubsub.publish('bid_entered', { bidEntered: { carNumber: "123",currentBid: 100 }});
        },
    }
}