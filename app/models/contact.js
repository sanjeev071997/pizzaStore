const { message } = require('laravel-mix/src/Log');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const contactSchema = new Schema({
    name:  { type: String, required: true},

    email: { type: String, required: true},

    phone : { type: Number, required:true},

    message: {type: String, required: true}



}, {timestamps: true });

// const User = new  mongoose.model('User', userSchema);

module.exports =  mongoose.model('Contact', contactSchema);