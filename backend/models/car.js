const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    carName: String,
    basePrice: Number,
    addedBy: String
});

module.exports = mongoose.model('Car', carSchema);