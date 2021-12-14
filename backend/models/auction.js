const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auctionSchema = new Schema({
    carId: String,
    bidderId: String,
    bidValue: String
});

module.exports = mongoose.model('Auction', auctionSchema);