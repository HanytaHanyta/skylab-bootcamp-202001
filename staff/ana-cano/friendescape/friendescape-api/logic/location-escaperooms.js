const { models: { Escaperoom } } = require('friendescape-data')
const { validate } = require('friendescape-utils')
const { NotFoundError } = require('friendescape-errors')

module.exports = async query => {

    validate.string(query, 'query')
    const escapeRooms = await Escaperoom.find({"location": { "$regex":query}})
    return escapeRooms
}
