const { models: { Escaperoom } } = require('friendescape-data')
const { validate } = require('friendescape-utils')
const { NotFoundError } = require('friendescape-errors')

module.exports = async query => {

    validate.string(query, 'query')

    return (async()=>{
    const escapeRooms = await Escaperoom.find({theme: query})
    return escapeRooms
})()
}

    // // return (async ()=> {
    //     const escapeRooms = await Escaperoom.findMany({theme: query})
    //     return escapeRooms
    // })
