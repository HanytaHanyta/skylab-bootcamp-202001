require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User } } = require('friendescape-data')
const { expect } = require('chai')
const { random } = Math
const deactivateUser = require('./deactivate-user')
const bcrypt = require('bcryptjs')

describe('deactivateUser', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, email, password

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
        deactivated = 0
    })

    describe('when user already exists', () => {
        let userId

        beforeEach(() =>
            bcrypt.hash(password, 10)
                .then(password =>
                    User.create({ name, surname, email, password })

                )
                .then(user => userId = user.id)
        )

        it('should deactivate the user', async () => {
            const result = await deactivateUser(userId)
            const user = await User.findById(userId)

            expect(result).to.exist
            expect(result).to.be.true
            expect(user).to.exist
            expect(user.deactivated).to.equal('1')


        })
    })
    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})