const Car = require('./../../models/car');
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
    }
}