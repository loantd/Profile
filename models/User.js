const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create collection User
const UserSchema = new Schema({
    name : {
        type :String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type:String,
        required :true,
    },
    avatar : {
        type : String,
    },
    date :{
        type : Date,
        default : Date.now
    }
});
module.exports = mongoose.model('User',UserSchema);