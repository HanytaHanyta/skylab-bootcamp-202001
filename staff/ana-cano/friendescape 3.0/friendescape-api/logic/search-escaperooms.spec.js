require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Escaperoom } } = require('friendescape-data')
const { expect } = require('chai')
const { floor, random } = Math
const searchEscapeRooms = require('./search-escaperooms')


describe('searchEscapeRooms', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Escaperoom.deleteMany()]))
    )
    let query, date, time, state, escaperoomsIDS, titles, descriptions, locations, durations,
        title, location, description, punctuation, theme, difficulty, duration, price, minplayers,
        maxplayers, img, web, video


    beforeEach(async () => {

        const items = []
        escaperoomsIDS = []
        titles = []
        descriptions = []
        locations = []
        durations = []
        query = "paranormal"


        for (let i = 0; i < 5; i++) {

            date = new Date
            time = `time-${random()}`
            state = 'active'
            title = `title-${random()}`
            location = `location-${random()}`
            description = `description-${random()}`
            punctuation = 3
            theme = `theme-${random()}`
            difficulty = i + 1
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


    it('should succeed on valid retrieve escaperoom by query', async () => {
        const themeEscapeRooms = await searchEscapeRooms(query)

        expect(themeEscapeRooms).to.exist



        themeEscapeRooms.forEach(element => {
            expect(element.id).to.exist
            expect(element.id).to.be.a('string')
            expect(element.id).to.have.length.greaterThan(0)
            expect(element.id).be.oneOf(escaperoomsIDS)

            expect(element.title).to.exist
            expect(element.title).to.be.a('string')
            expect(element.title).to.have.length.greaterThan(0)
            expect(element.title).be.oneOf(titles)

            expect(element.description).to.exist
            expect(element.description).to.be.a('string')
            expect(element.description).to.have.length.greaterThan(0)
            expect(element.description).be.oneOf(descriptions)

            expect(element.location).to.exist
            expect(element.location).to.be.a('string')
            expect(element.location).to.have.length.greaterThan(0)
            expect(element.location).be.oneOf(locations)

            expect(element.duration).to.exist
            expect(element.duration).to.be.a('string')
            expect(element.duration).to.have.length.greaterThan(0)
            expect(element.duration).be.oneOf(durations)

            expect(element.difficulty).to.exist
            expect(element.difficulty).to.be.a('number')
            expect(element.difficulty).to.equal(query)

        })

    })
    it('should fail on non existing escape', () => {
        let wrongEscape = "afdafafafafabvahdjuhsrtyt"
        searchEscapeRooms(wrongEscape)
            .then(() => { throw new NotAllowedError('should not reach this point') })
            .catch(({ message }) => {
                expect(message).not.to.be.undefined
                expect(message).to.equal(`scape with with this value doesn't exists`)
            })
    })

    after(() => Promise.all([User.deleteMany(), Escaperoom.deleteMany()]).then(() => mongoose.disconnect()))
})
