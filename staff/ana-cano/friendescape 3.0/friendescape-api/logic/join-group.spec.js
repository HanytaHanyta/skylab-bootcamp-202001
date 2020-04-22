require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Group, Escaperoom} } = require('friendescape-data')
const { expect } = require('chai')
const { random } = Math
const joinGroup = require('./join-group')
// const bcrypt = require('bcryptjs')

describe('joinGroup', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )
    let name, surname, email, telf, password, pubevents, foults, trusty
    let escaperoomId, userId, groupId, date, time, state
    let title, location, description, punctuation, theme, difficulty, duration, price, minplayers, maxplayers, img, web, video
    
    
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

            escapeRoomId = escapeRoom.id

            const user = await User.create({name, surname, email, telf, password })

            userId = user.id

            const group = await Group.create({date, time, state, escapeRoom: escapeRoomId})

            groupId = group.id
        
        })

        it('should succeed on valid join group and add the groupId to the user', async () => {
            
            const joined = await joinGroup(userId, groupId)
            const user = await User.findById(userId)

            expect(user.subbedTo.toString()).to.equal(groupId)
  
            })

        it('should succeed on valid join group and add the id of the user to subevents', async () => {

            const joined = await joinGroup(userId, groupId)
            const group = await Group.findById(groupId)

            expect(group.subevents.toString()).to.equal(userId)
            
        
            })

            
        // it('should succeed on valid user user id in its group', async () => {
        //     const group = await createGroup(_escaperoomId, _id, date, time, state)

        //     expect(group.subevents[0].toString()).to.equal(_id)
        //     const group = await createGroup(_escaperoomId, _id, date, time, state)
        //     const user = await User.findById(_id)

        //     expect(user.pubevents[0]).to.equal(group.id)
            
        //     })
    })

    after(() => Promise.all([User.deleteMany(), Escaperoom.deleteMany(), Group.deleteMany() ]).then(() => mongoose.disconnect()))
})
