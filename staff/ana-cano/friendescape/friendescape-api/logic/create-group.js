const { validate } = require('friendescape-utils')
const { models: { Group, User}, } = require('friendescape-data')
const { NotFoundError } = require('friendescape-errors')

module.exports = (escaperoomId, userId, date, time, state ) => {
    validate.string(escaperoomId, 'escaperoomId')
    validate.string(userId, 'userId')
    validate.type(date, 'date', Date)
    validate.string(time, 'time')
    validate.string(state, 'state')
    
    return ( async() =>{ 

    const newGroup = new Group({date, time, state, escapeRoom: escaperoomId} )
    
    newGroup.subevents.push(userId)

    const user = await User.findById(userId)

    user.pubevents.push(newGroup._id.toString())

    newGroup.id = newGroup._id.toString()

    await user.save()
    await newGroup.save()
    
    return newGroup

})()
}

