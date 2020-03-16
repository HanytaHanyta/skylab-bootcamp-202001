const { validate } = require('friendescape-utils')

const { models: { Group } } = require('friendescape-data')
const { NotFoundError, NotAllowedError } = require('friendescape-errors')

module.exports = () => {
    const newdate= new Date
    return Group.find({"date" : { "$gt" : newdate}})
        .then(res => {
            if (res) return res
            else throw new NotFoundError(`No groups defined`)
        })   
}