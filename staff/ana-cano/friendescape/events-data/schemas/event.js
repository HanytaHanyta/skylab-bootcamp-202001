const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({

    title: { type: String, required: true, ref: 'roomEscape'},
    location: { type: String, required: true, ref: 'roomEscape'},
    date: { type: Date, required: true },
    time: { type: String, required: true},
    minplayers: { type: Number, required: true, ref: 'roomEscape'},
    img: { type: String, required: true, ref: 'roomEscape'},
    maxplayers: { type: Number, required: true, ref: 'roomEscape' },
    publisher: { type: ObjectId, required: true, ref: 'User' },
    created: { type: Date, required: true, default: Date.now },
    subscribed: [{ type: ObjectId, ref: 'User' }]
})