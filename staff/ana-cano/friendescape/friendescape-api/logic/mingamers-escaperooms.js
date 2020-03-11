const { models: { Escaperoom } } = require('friendescape-data')
const { validate } = require('friendescape-utils')
const { NotFoundError } = require('friendescape-errors')

module.exports = async query => {

    validate.string(query, 'query')
    debugger
    const escapeRooms = await Escaperoom.find({"minplayers": { "$min":query}})
    return escapeRooms
}
