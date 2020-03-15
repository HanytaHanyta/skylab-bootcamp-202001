const { validate } = require('friendescape-utils')
const { models: { Group, User} } = require('friendescape-data')
const { NotFoundError } = require('friendescape-errors')
module.exports = async (userid) => {
 
    const groupuser = await User.findById(userid).populate("group").lean()

    return groupuser
}