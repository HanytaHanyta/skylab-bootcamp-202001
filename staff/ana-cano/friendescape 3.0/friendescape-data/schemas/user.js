 const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: {type: String },
    surname: {type: String},
    email: {type: String},
    telf: {type: String },
    password: {type: String}, 
    pubevents: [{type: String}],
    foults: {type: Number, default:0},
    trusty: {type: Number, default:0},
    deactivated: {type: String, default:0},   
    subbedTo: [{ type: ObjectId, ref: 'Group' }]

})