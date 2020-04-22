const { validate } = require('friendescape-utils')
const { models: { User } } = require('friendescape-data')
const { NotAllowedError } = require('friendescape-errors')
const bcrypt = require('bcryptjs')

module.exports = (email, password) => {
    validate.string(email, 'email')
    validate.email(email)
    validate.string(password, 'password')

    return User.findOne({ email })
        .then(user => {
            if (!user) throw new NotAllowedError(`wrong credentials`)

            if(user.deactivated === "1") throw new NotAllowedError(`this user had several foults for this reason is deactivated`)

            return bcrypt.compare(password, user.password)
                .then(validPassword => {
                    if (!validPassword) throw new NotAllowedError(`wrong credentials`)


                    return user.save()
                })
                .then(({ id }) => id)
        })
}

