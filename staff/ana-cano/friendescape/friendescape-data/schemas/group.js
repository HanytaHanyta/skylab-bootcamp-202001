const { Schema, SchemaTypes:{ObjectId} } = require('mongoose')

module.exports = new Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true},
    subevents: [
        { 
            type: ObjectId, 
            ref: 'user' 
        }
    ],
    // img: { type: String, required: true, ref: 'roomEscape'},
    created: { type: Date, required: true, default: Date.now },
    state: { 
        type: String, 
        required: true, 
        enum:['active','inactive']
    },
    escapeRoom: {
       type: ObjectId,
       ref: "Escaperoom"
    }
})