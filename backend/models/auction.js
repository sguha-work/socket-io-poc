let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let schema = new Schema({
    carNumber : {type:String, require:true},
    latestPrice: {type:Number, require:true},
    lastUpdatedOn: {type:String, required: true}
});
module.exports = mongoose.model('AuctionModel',schema);