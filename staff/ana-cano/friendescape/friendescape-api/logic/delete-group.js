const { validate } = require('friendescape-utils')
const { models: { Group} } = require('friendescape-data')
const { NotFoundError } = require('friendescape-errors')

module.exports =(groupId) => {

    validate.string(groupId, 'groupId')

    return (async ()=>{

    const deletegroup = await Group.findById(groupId)
    
    if (!deletegroup) throw new NotFoundError(`group with id ${groupId} not found`)

    const deleted = await Group.deleteOne({_id: groupId})

    return deleted
    })()

}