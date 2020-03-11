const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    // rol: { type: String, required: true, default: 'user'},
    name: {type: String, required: true },
    surname: {type: String, required: true},
    email: {type: String, required: true},
    telf: {type: String, required: true },
    password: {type: String, required: true}, 
    // pubevents: [{ type: ObjectId, ref:'Events'}],
    // subevents: [{ type: ObjectId, ref:'Events'}],
    foults: {type: Number},
    trusty: {type: Number},
    deactivated: {type: String, default:0},
    escapeRoom: {
        type: ObjectId,
        ref: "user"
     },
    group: {
        type: ObjectId,
        ref: "group"
    }

})