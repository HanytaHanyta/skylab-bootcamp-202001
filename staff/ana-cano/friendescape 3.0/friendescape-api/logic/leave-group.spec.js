require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Group, Escaperoom} } = require('friendescape-data')
const { expect } = require('chai')
const { random } = Math
const leaveGroup = require('./leave-group')


describe('leaveGroup', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )
    let name, surname, email, telf, password, pubevents, foults, trusty, userId
    let escaperoomId, date, time, state
    let title, location, description, punctuation, theme, difficulty, duration, price, minplayers, maxplayers, img, web, video, groupId

    
    beforeEach(() => {
        
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
        

        beforeEach ( async () => { 

            const escapeRoom = await Escaperoom.create({title, location, description, punctuation, theme, difficulty, duration, price, minplayers, maxplayers, img, web, video})
            
            escaperoomId = escapeRoom.id

            const user = await User.create({name, surname, email, telf, password} )

            userId = user.id

            const group = await Group.create({ date, time, state, subevents: userId, escapeRoom: escaperoomId} )

            groupId = group.id

        
        })

        it('it should succed on leave group and delete the userId from the subevents array', async () => {
          
            const deleted = await leaveGroup(userId, groupId)

            const group = await Group.findById(groupId)

            expect(group.subevents).not.to.be.undefined
           
            })

    })

    after(() => Promise.all([User.deleteMany(), Escaperoom.deleteMany(), Group.deleteMany() ]).then(() => mongoose.disconnect()))
})
