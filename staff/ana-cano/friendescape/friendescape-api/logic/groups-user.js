const { validate } = require('friendescape-utils')
const { models: { Group, User} } = require('friendescape-data')
const { NotFoundError } = require('friendescape-errors')
module.exports = (userId) => {

    validate.string(userId, 'userId')
    return (async()=> {
 
    const groupuser = await User.findById(userid).populate("group").lean()

    return groupuser
    })()
}