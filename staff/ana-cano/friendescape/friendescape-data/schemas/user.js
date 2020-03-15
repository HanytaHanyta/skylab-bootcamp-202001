const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: {type: String },
    surname: {type: String},
    email: {type: String},
    telf: {type: String },
    password: {type: String}, 
    pubevents: {type: String},
    foults: {type: Number},
    trusty: {type: Number},
    deactivated: {type: String, default:0},   

})