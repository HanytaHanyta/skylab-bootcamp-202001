const { models: { Group, User } } = require('friendescape-data')
const { validate } = require('friendescape-utils')
const { NotFoundError } = require('friendescape-errors')

module.exports = async (id, userId) => {

    validate.string(id, 'id')
    validate.string(userId, 'userId')

    const joing = await Group.findById(id)

    if (!joing) throw new NotFoundError(`group with id ${id} not found`)

    if(User.pubevents )



    

        
    return Group.findById(id)
        .then(group => {

            if (!group) throw new NotFoundError(`group with ${id} doesn't exist`)

            const groupuser = Group.findById(id)

            groupuser.push({"pubevents": id})
            return groupuser.save()
        })
    }