const { validate } = require('friendescape-utils')

const { models: { Group, User, Escaperoom } } = require('friendescape-data')
const { NotFoundError, NotAllowedError } = require('friendescape-errors')

module.exports = () => {

    return (async ()=> {

        const newdate= new Date
        const groups = await Group.find({"date" : { "$gt" : newdate}}).populate('subevents', 'name surname foults trusty').populate('escapeRoom', 'title location punctuation theme difficulty duration price img minplayers maxplayers')
        
        if (!groups) throw new NotFoundError(`No groups defined`)

        const retrievedGroups = []

        groups.map(group => {
            const element = {}
            element.id = group.id
            element.date = group.date
            element.time = group.time
            element.subevents = group.subevents
            element.created = group.created
            element.state = group.state
            element.escapeRoom = group.escapeRoom
            
            retrievedGroups.push(element)
        })
        


        return retrievedGroups

    })()

}

 