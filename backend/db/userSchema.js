const mongoose = require('mongoose');   
const { Schema } = mongoose;
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB_STRING);


const userSchema = new Schema({
    username : String,
    firstname : String,
    lastname : String,
    password : String,
})


const accountSchma = new Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId, ///reference to user model
        ref : 'User',
        required : true
    },
    balance: {
        type: Number,
        required : true
    }
})

const User = mongoose.model('User',userSchema); 
const Account = mongoose.model('Accounts',accountSchma);

module.exports = {
    User,
    Account
}