const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required:true
    },
    cartData : {
        type:Object
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

module.exports = User;
