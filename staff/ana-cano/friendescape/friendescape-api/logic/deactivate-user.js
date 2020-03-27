const { validate } = require('friendescape-utils')
const { models: { User } } = require('friendescape-data')
const { NotFoundError } = require('friendescape-errors')

module.exports = (userId) => {

    validate.string(userId, 'userId')

    return (async () => {

        const user = await User.findById(userId)

        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        user.deactivated = 1

        await user.save()

        return true
    })()


}