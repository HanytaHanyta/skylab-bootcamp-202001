const { models: { Escaperoom } } = require('friendescape-data')
const { validate } = require('friendescape-utils')
const { NotFoundError } = require('friendescape-errors')

module.exports = query => {

    return (async ()=> {
    validate.string(query, 'query')

    const escapeRooms = await Escaperoom.find({"minplayers": { $gte : query}})
    return escapeRooms
})()
}
