require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveEscapeRoom = require('./retrieve-escaperoom')
const { mongoose, models: { User } } = require('friendescape-data')

describe('retrieveEscapeRoom', ()=> {

    let id

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )

    beforeEach(() => {
        id = "5e6fa9cf77f40006baafd435"
    })

    it('should succeed on correct retrieve escaperoom', async () => {
        const escapeRoom = await retrieveEscapeRoom(id)

        expect(escapeRoom).to.exist
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))

})