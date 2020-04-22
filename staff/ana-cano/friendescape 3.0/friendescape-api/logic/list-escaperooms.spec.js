require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Escaperoom } } = require('friendescape-data')
const { expect } = require('chai')
const { random } = Math
const listEscaperooms = require('./list-escaperooms')


describe('listEscaperooms', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Escaperoom.deleteMany()]))
    )
    let name, surname, email, telf, password, pubevents, foults, trusty
    let date, time, state, escaperoomsIDS, titles, descriptions, locations, durations
    let title, location, description, punctuation, theme, difficulty, duration, price, minplayers, maxplayers, img, web, video


    beforeEach(async () => {

        const items = []
        escaperoomsIDS = []
        titles = []
        descriptions = []
        locations = []
        durations = []


        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@email.com`
        telf = `telf-${random()}`
        password = `password-${random()}`
        pubevents = [`event-${random()}`]
        foults = 0
        trusty = 0

        for (let i = 0; i < 3; i++) {

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

            items.push(Escaperoom.create({ title, location, description, punctuation, theme, difficulty, duration, price, minplayers, maxplayers, img, web, video })
                .then(escaperoom => escaperoomsIDS.push(escaperoom.id)))

            titles.push(title)
            descriptions.push(description)
            locations.push(location)
            durations.push(duration)

        }


        await Promise.all(items)
    })


    it('should succeed on valid list of escaperooms', async () => {
        const escaperooms = await listEscaperooms()

        expect(escaperooms).to.exist
        expect(escaperooms).to.have.lengthOf(3)

        escaperooms.forEach(escaperoom => {
            expect(escaperoom.id).to.exist
            expect(escaperoom.id).to.be.a('string')
            expect(escaperoom.id).to.have.length.greaterThan(0)
            expect(escaperoom.id).be.oneOf(escaperoomsIDS)

            expect(escaperoom.title).to.exist
            expect(escaperoom.title).to.be.a('string')
            expect(escaperoom.title).to.have.length.greaterThan(0)
            expect(escaperoom.title).be.oneOf(titles)

            expect(escaperoom.description).to.exist
            expect(escaperoom.description).to.be.a('string')
            expect(escaperoom.description).to.have.length.greaterThan(0)
            expect(escaperoom.description).be.oneOf(descriptions)

            expect(escaperoom.location).to.exist
            expect(escaperoom.location).to.be.a('string')
            expect(escaperoom.location).to.have.length.greaterThan(0)
            expect(escaperoom.location).be.oneOf(locations)

            expect(escaperoom.duration).to.exist
            expect(escaperoom.duration).to.be.a('string')
            expect(escaperoom.duration).to.have.length.greaterThan(0)
            expect(escaperoom.duration).be.oneOf(durations)

        })

    })


    after(() => Promise.all([User.deleteMany(), Escaperoom.deleteMany()]).then(() => mongoose.disconnect()))
})
