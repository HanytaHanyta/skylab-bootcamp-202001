const { models: { Escaperoom } } = require('friendescape-data')
const { validate } = require('friendescape-utils')
const { NotFoundError } = require('friendescape-errors')

module.exports = query => {

    //validate.string(query, 'query')

    return (async()=>{
    const escapeRooms = await Escaperoom.find({"difficulty": query})
    return escapeRooms
    })()
}
