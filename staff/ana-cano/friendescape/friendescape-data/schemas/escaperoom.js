const { Schema, Types: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    title: { type: String, required: true },
    location: { type: String, required: true},
    description: { type: String, required: true},
    punctuation: { type: Number, required: true},
    theme: { type: String, required: true },
    difficulty: { type: Number, required: true},
    duration: { type: String, required: true},
    price: { type: Number, required: true},
    minplayers: { type: Number, required: true },
    maxplayers: { type: Number, required: true },
    img: { type: String, required: true},
    web: { type: String, required: true},
    video: { type: String, required: true}

})