const { validate } = require('friendescape-utils')
const { models: { Escaperoom } } = require('friendescape-data')
const { NotFoundError, NotAllowedError } = require('friendescape-errors')

module.exports = id => {

    validate.string(id, 'id')

    return Escaperoom.findById(id)
        .then(escape => {

            if (!escape) throw new NotFoundError(`escape with id ${id} does not exist`)
            
            return escape
        })
}