require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Group, Escaperoom } } = require('friendescape-data')
const { expect } = require('chai')
const { random } = Math
const deleteGroup = require('./deletev2')
// const bcrypt = require('bcryptjs')

describe('deleteGroup', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => User.deleteMany())
    )
    let name, surname, email, telf, password, pubevents, foults, trusty
    let escaperoomId, userId, date, time, state
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
        let _escaperoomId

        beforeEach(async () => {

            const escapeRoom = await Escaperoom.create({ title, location, description, punctuation, theme, difficulty, duration, price, minplayers, maxplayers, img, web, video })


            _escaperoomId = escapeRoom.id



            const user = await User.create({ name, surname, email, telf, password })

            const group = await Group.create({ date, time, state, escapeRoom: _escaperoomId })

            groupId = group._id.toString()

            userId = user.id

            escaperoomId = _escaperoomId



        })

        it('should succeed on correct status change to inactive', async () => {

            const deleted = await deleteGroup(userId, groupId)
            const group = await Group.findById(groupId)

            expect(deleted).not.to.exist
            expect(group.state).to.equal('inactive')
        })

        it('should fail on non existing user', async () => {
            userId = "5214"
            deleteGroup(userId, groupId)
            .then(()=> {throw new NotAllowedError('should not reach this point')})
            .catch(({ message }) => {
                expect(message).not.to.be.undefined
                expect(message).to.equal(`user with id ${userId} does not exist`)
            })
            
        })

        it('should fail on non existing group', async () => {
            groupId = "5214"
            deleteGroup(userId, groupId)
            .then(()=> {throw new NotAllowedError('should not reach this point')})
            .catch(({ message }) => {
                expect(message).not.to.be.undefined
                expect(message).to.equal(`group with id ${groupId} does not exist`)
            })
            
        })

    })

    after(() => Promise.all([User.deleteMany(), Escaperoom.deleteMany(), Group.deleteMany()]).then(() => mongoose.disconnect()))
})
