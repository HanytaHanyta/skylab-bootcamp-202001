require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveUser = require('./retrieve-user')
const { mongoose, models: { User } } = require('friendescape-data')

describe('retrieveUser', () => {
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
    })

    describe('when user already exists', () => {
        let _id

        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(({ id }) => _id = id)
        )

        it('should succeed on correct and valid and right data', () =>
            retrieveUser(_id)
                .then(user => {
                    expect(user.constructor).to.equal(Object)
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.exist
                })
        )
        it('Should fail on incorrect id User', () => {
            let id = "543"
            retrieveUser(id)
                .then(() => { throw new NotAllowedError('should not reach this point') })
                .catch(({ message }) => {
                    expect(message).not.to.be.undefined
                    expect(message).to.equal(`user with id ${id} does not exist`)
                })
        })
        
        it('Should fail on deactivated id User', () => {
            const user = User.create({ name, surname, email, password })
            user.deactivated = 1
            let id = "pepito"
            retrieveUser(id)
                .then(() => { throw new NotAllowedError('should not reach this point') })
                .catch(({ message }) => {
                    expect(message).not.to.be.undefined
                    expect(message).to.equal(`user with id ${id} is deactivated`)
                })
        })


    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()))

})