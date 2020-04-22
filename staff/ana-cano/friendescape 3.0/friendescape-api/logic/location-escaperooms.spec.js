require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Escaperoom } } = require('friendescape-data')
const { expect } = require('chai')
const { floor, random } = Math
const locationEscaperooms = require('./location-escaperooms')


describe('locationEscaperooms', () => {
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
        query = `location-${floor(random()*5)+1}`
        

        for (let i = 0; i < 5; i++) {

            date = new Date
            time = `time-${random()}`
            state = 'active'
            title = `title-${random()}`
            location = `location-${i+1}`
            description = `description-${random()}`
            punctuation = 3
            theme = `theme-${random()}`
            difficulty = i+1
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
        const retrievedEscapeRooms = await locationEscaperooms(query)

        expect(retrievedEscapeRooms).to.exist



        retrievedEscapeRooms.forEach(element => {
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
            expect(element.location).to.equal(query)

            expect(element.duration).to.exist
            expect(element.duration).to.be.a('string')
            expect(element.duration).to.have.length.greaterThan(0)
            expect(element.duration).be.oneOf(durations)

        })

    })


    after(() => Promise.all([User.deleteMany(), Escaperoom.deleteMany()]).then(() => mongoose.disconnect()))
})
