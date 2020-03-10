const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    rol: { type: String, required: true, default: 'user'},
    name: {type: String, required: true },
    surname: {type: String, required: true},
    email: {type: String},
    telf: {type: String, required: true },
    password: {type: String}, 
    image: String,
    pubevents: [{ type: ObjectId, ref:'Events'}],
    subevents: [{ type: ObjectId, ref:'Events'}],
    foults: {type: Number},
    trusty: {type: Number}
})