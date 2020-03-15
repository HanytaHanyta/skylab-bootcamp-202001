const { validate } = require('friendescape-utils')
const { models: { Group, User} } = require('friendescape-data')
const { NotFoundError } = require('friendescape-errors')

module.exports = async (escaperoomid, userid, title,location, date, time,
    minplayers, maxplayers, state ) => {
    validate.string(escaperoomid, 'escaperoomid')
    validate.string(userid, 'userid')
    validate.string(title, 'title')
    validate.string(date, 'date')
    validate.string(time, 'time')

    const newGroup = new Group(title,location, date, time,
        minplayers, maxplayers, state)
    
    const savedGroup = await newGroup.save()
    const updatGroup = await newGroup.update({_id:savedGroup._id},
        {$push:{subevents: userid}},
        {$push:{escapeRoom: escaperoomid}})

    const updatedUser = await User.update({_id:userid},
        {$push:{pubevents: savedGroup._id}})

    return

}