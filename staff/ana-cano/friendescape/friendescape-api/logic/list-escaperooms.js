const { models: { Escaperoom } } = require('friendescape-data')

module.exports = () => {
    return (async () => {

        const escapeRooms = await Escaperoom.find()
        return escapeRooms
    })()
}