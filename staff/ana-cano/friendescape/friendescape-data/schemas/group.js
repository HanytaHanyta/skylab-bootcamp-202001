const { Schema, SchemaTypes:{ObjectId} } = require('mongoose')

module.exports = new Schema({

    // title: { type: String, required: true, ref: 'roomEscape'},
    // location: { type: String, required: true, ref: 'roomEscape'},
    date: { type: Date, required: true },
    time: { type: String, required: true},
    // minplayers: { type: Number, required: true, ref: 'roomEscape'},
    // maxplayers: { type: Number, required: true, ref: 'escaperoom' },
    // img: { type: String, required: true, ref: 'roomEscape'},
    // publisher: { type: ObjectId, required: true, ref: 'user' },
    created: { type: Date, required: true, default: Date.now },
    // subscribed: [{ type: ObjectId, ref: 'user' }],
    state: [{ type: String, required: true}],
    escapeRoom: {
       type: ObjectId,
       ref: "Escaperoom",
       required: true
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    }

})