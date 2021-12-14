let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let schema = new Schema({
    carNumber: {type:String, require:true},
    carModelName:{type:String, require:true},
    carImage:{type:String, require:true},
    carBasePrice:{type:Number, require:true},
    currentBidPrice:{type: Number, required: false}
});


module.exports = mongoose.model('Car',schema);