const { models: { Escaperoom } } = require('friendescape-data')
const { validate } = require('friendescape-utils')
const { NotFoundError } = require('friendescape-errors')

module.exports =  (query) => {

    validate.string(query, 'query')

    return Escaperoom.find({ title: { $regex: query, $options: "i" } } )
        .then(scape => {
            if (!scape) throw new NotAllowedError(`scape with email ${email} already exists`)

            return scape
        })
}