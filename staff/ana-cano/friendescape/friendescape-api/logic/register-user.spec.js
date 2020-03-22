require('dotenv').config()

const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User } } = require ('friendescape-data')
const registerUser = require('./register-user')
const bcrypt = require('bcryptjs')

const { env: { TEST_MONGODB_URL } } = process

describe('registerUser', () => {
   

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    let name, surname, email, telf, password


    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        telf = `telf-${random()}`
        password = `password-${random()}`

        
    })
    it('should succeed on correct user data', () =>{
        registerUser(name, surname, email, telf, password)
            .then(result => {
                expect(result).not.to.exist
                expect(result).to.be.undefined

                return User.findOne({ email })
            })
            .then(user => {
                expect(user).to.exist
                expect(user.id).to.be.a('string')
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.telf).to.equal(telf)
                expect(user.created).to.be.instanceOf(Date)

                return bcrypt.compare(password, user.password)
            })
            .then(validPassword => expect(validPassword).to.be.true)
        }
    )

    after(() => Promise.all([User.deleteMany()]).then(() => mongoose.disconnect())) 
})