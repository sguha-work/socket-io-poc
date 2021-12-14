let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let schema = new Schema({
    userName: {type:String, require:true},
    userPassword:{type:String, require:true},
});


module.exports = mongoose.model('User',schema);