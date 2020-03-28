require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { expect } = require('chai')
const { random } = Math
const searchEscapeRooms = require('./search-escaperooms')
const { mongoose, models: { User, Escaperoom } } = require('friendescape-data')

describe('searchEscapeRooms', () => {

    let query, date, time, state, title, location, description, punctuation, theme, difficulty, duration, price, minplayers,maxplayers, img, web, video, id, id2, id3, theme2

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
        theme = 'terror'
        theme2 = 'fantasy'
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

        const escaperoom2 = await Escaperoom.create({ title: 'Crash', location, description, punctuation, theme:'fantasy', difficulty, duration, price, minplayers, maxplayers, img, web, video })
        id2 = escaperoom2.id

        const escaperoom3 = await Escaperoom.create({ title: 'Crash', location, description, punctuation, theme:'fantasy', difficulty, duration, price, minplayers, maxplayers, img, web, video })
        id3 = escaperoom3.id
    })

    it('should succeed on correct retrieve escaperoom', async () => {

        query = 'Crash'
        const escapeRooms = await searchEscapeRooms(query)

        expect(escapeRooms).to.exist
        expect(escapeRooms.length).to.equal(2)
        


    })

    after(() => Promise.all([User.deleteMany(), Escaperoom.deleteMany()]).then(() => mongoose.disconnect()))

})