require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const retrieveEscapeRoom = require('./retrieve-escaperoom')
const { mongoose, models: { User, Escaperoom } } = require('friendescape-data')

describe('retrieveEscapeRoom', () => {

    let id

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Escaperoom.deleteMany()]))
    )

    beforeEach(async () => {
        date = new Date
        time = `time-${random()}`
        state = 'active'
        title = `title-${random()}`
        location = `location-${random()}`
        description = `description-${random()}`
        punctuation = 3
        theme = `theme-${random()}`
        difficulty = 3
        duration = `duration-${random()}`
        price = 20
        minplayers = 4
        maxplayers = 8
        img = `url-${random()}`
        web = `web-${random()}`
        video = `video-${random()}`

        const escaperoom = await Escaperoom.create({ title, location, description, punctuation, theme, difficulty, duration, price, minplayers, maxplayers, img, web, video })
        id = escaperoom.id
    })

    it('should succeed on correct retrieve escaperoom', async () => {
        const escapeRoom = await retrieveEscapeRoom(id)

        expect(escapeRoom).to.exist

        expect(escapeRoom.title).to.equal(title)
        expect(escapeRoom.location).to.equal(location)
        expect(escapeRoom.description).to.equal(description)
        expect(escapeRoom.punctuation).to.equal(punctuation)
        expect(escapeRoom.theme).to.equal(theme)
        expect(escapeRoom.difficulty).to.equal(difficulty)
        expect(escapeRoom.duration).to.equal(duration)
        expect(escapeRoom.price).to.equal(price)
        expect(escapeRoom.minplayers).to.equal(minplayers)
        expect(escapeRoom.maxplayers).to.equal(maxplayers)
        expect(escapeRoom.img).to.equal(img)
        expect(escapeRoom.web).to.equal(web)
        expect(escapeRoom.video).to.equal(video)

    })

    after(() => Promise.all([User.deleteMany(), Escaperoom.deleteMany()]).then(() => mongoose.disconnect()))

})