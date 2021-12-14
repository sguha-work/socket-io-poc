let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let schema = new Schema({
    carId: {type:String, required: true},
    bidderId: {type:String, required: true},
    bidValue: {type:Number, required: true}
});
module.exports = mongoose.model('Auction',schema);