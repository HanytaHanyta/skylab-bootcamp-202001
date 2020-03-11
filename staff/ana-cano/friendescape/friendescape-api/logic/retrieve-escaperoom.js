const { validate } = require('friendescape-utils')
const { models: { Escaperoom } } = require('friendescape-data')
const { NotFoundError, NotAllowedError } = require('friendescape-errors')

module.exports = title, location, description, punctuation, theme, difficulty, duration, price, minplayers, maxplayers, img, web, video
    validate.string()

    return Escaperoom.find({title:"Ouija"})
