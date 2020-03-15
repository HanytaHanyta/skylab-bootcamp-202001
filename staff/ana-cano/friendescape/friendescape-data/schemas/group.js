const { Schema, SchemaTypes:{ObjectId} } = require('mongoose')

module.exports = new Schema({
    title: { type: String, required: true},
    location: { type: String, required: true},
    date: { type: Date, required: true },
    time: { type: String, required: true},
    subevents: [{ type: ObjectId, ref: 'user' }],
    minplayers: { type: Number, required: true},
    maxplayers: { type: Number, required: true },
    // img: { type: String, required: true, ref: 'roomEscape'},
    created: { type: Date, required: true, default: Date.now },
    state: [{ type: String, required: true, enum:['active','inactive']}],
    escapeRoom: {
       type: ObjectId,
       ref: "Escaperoom"
    }
})