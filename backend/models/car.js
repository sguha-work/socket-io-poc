const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    carNumber: String,
    carImage: String,
    carName: String,
    basePrice: Number,
    addedBy: String,
    currentBid: Number,
    currentHighestBidder: String
});

module.exports = mongoose.model('Car', carSchema);