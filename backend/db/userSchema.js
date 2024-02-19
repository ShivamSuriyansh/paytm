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

const User = mongoose.model('User',userSchema); 

module.exports = {
    User
}