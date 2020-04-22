require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Group, Escaperoom} } = require('friendescape-data')
const { expect } = require('chai')
const { random } = Math
const createGroup = require('./create-group')
// const bcrypt = require('bcryptjs')

describe('createGroup', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )
    let name, surname, email, telf, password, pubevents, foults, trusty
    let escaperoomId, userId, date, time, state
    let title, location, description, punctuation, theme, difficulty, duration, price, minplayers, maxplayers, img, web, video
    
    
    beforeEach(() => {
        
        // userId = `userId-${random()}`
        date = new Date
        time = `time-${random()}`
        state = 'active'

        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@email.com`
        telf = `telf-${random()}`
        password = `password-${random()}`
        pubevents = [`event-${random()}`]
        foults = 0
        trusty = 0
        
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
    })

    describe('when user already exists', () => {
        let _id, _escaperoomId

        beforeEach ( async () => { 

            const escapeRoom = await Escaperoom.create({title, location, description, punctuation, theme, difficulty, duration, price, minplayers, maxplayers, img, web, video})
            
            _escaperoomId = escapeRoom.id

            const user = await User.create({name, surname, email, telf, password })

            _id = user.id
        
        })

        it('should succeed on valid group and create it', async () => {
            const group = await createGroup(_escaperoomId, _id, date, time, state)

            expect(group.id).to.exist
  
            })

        it('should succeed on valid user published event group', async () => {
            const group = await createGroup(_escaperoomId, _id, date, time, state)
            const user = await User.findById(_id)

            expect(user.pubevents[0]).to.equal(group.id)
            
            })

        it('should succeed on valid user user id in its group', async () => {
            const group = await createGroup(_escaperoomId, _id, date, time, state)

            expect(group.subevents[0].toString()).to.equal(_id)
            
            })
    })

    after(() => Promise.all([User.deleteMany(), Escaperoom.deleteMany(), Group.deleteMany() ]).then(() => mongoose.disconnect()))
})
