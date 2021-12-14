let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let schema = new Schema({
    carNumber: {type: String, required: true},
    carImage: {type: String, required: true},
    carName: {type: String, required: true},
    basePrice: {type: Number, required: true},
    addedBy: {type: String, required: true},
    currentBid: {type: Number, required: false},
    currentHighestBidder: {type: String, required: false}
});


module.exports = mongoose.model('Car',schema);