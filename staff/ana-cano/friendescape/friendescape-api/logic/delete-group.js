const { validate } = require('friendescape-utils')
const { models: { User, Group} } = require('friendescape-data')
const { NotFoundError } = require('friendescape-errors')

module.exports =(groupId, userId) => {

    validate.string(groupId, 'groupId')
    validate.string(userId, 'userId')

    return (async ()=>{

    const user = await User.findById(userId)
    if (!user) throw new NotFoundError(`user with ${userId} does not exist`)

    else {

        const deletegroup = await Group.findById(groupId)
        
        if (!deletegroup) throw new NotFoundError(`group with id ${groupId} not found`)

        else {

            const deleted = await Group.deleteOne({_id: groupId})
        
            return deleted
        }
    

    }


    })()

}