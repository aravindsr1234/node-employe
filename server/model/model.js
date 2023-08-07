const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    salutation:String,
    firstname:String,
    lastname:String,
    email:String,
    number:Number,
    dob:Date,
    gender:String,
    qualification:String,
    address:String,
    country:String,
    state:String,
    city:String,
    image:String,
    created:{
        type: Date,
        required: true,
        default: Date.now,
    }

})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;