let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let schema = new Schema({
    email: {type:String, require:true},
    password:{type:String, require:true},
});


module.exports = mongoose.model('User',schema);