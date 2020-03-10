const mongoose = require ('mongoose')
const {escaperoom} = require ('../schemas')

module.exports = mongoose.model('Escaperoom', escaperoom)
