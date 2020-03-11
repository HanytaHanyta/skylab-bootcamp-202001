const { validate } = require('friendescape-utils')
const { models: { Group, User} } = require('friendescape-data')
const { NotFoundError } = require('friendescape-errors')

module.exports = async (escaperoomid, userid, { title, date, time }) => {

    validate.string(escaperoomid, 'escaperoomid')
    validate.string(userid, 'userid')
    validate.string(title, 'title')
    validate.string(date, 'date')
    validate.string(time, 'time')



    const user = await User.findById(userid)
    
    if (!user) throw new NotFoundError(`user with id ${id} not found`)

    await Group.create({title, date, time, escapeRoom: escaperoomid, user: userid})



}