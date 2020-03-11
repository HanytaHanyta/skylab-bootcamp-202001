const { validate } = require('friendescape-utils')
const { models: { User } } = require('friendescape-data')
const { NotFoundError, NotAllowedError } = require('friendescape-errors')

module.exports = id => {
    validate.string(id, 'id')

    return User.findById(id)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

            if (user.deactivated === 1) throw new NotAllowedError(`user with id ${id} is deactivated`)

            return user.save()
        })
        .then(({ name, surname, email, telf }) => ({ name, surname, email, telf }))
}