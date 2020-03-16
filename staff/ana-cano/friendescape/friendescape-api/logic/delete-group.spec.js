require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { Group } } = require('friendescape-data')
const { expect } = require('chai')
const { random } = Math
const deleteGroup = require('./delete-group')


describe('deleteGroup', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Group.deleteMany())
    )

    let date, time, subevents, created, state

    beforeEach(() => {
        date = new Date
        time =`time-${random()}`
        subevents =[`subevents-${random()}`,`subevents-${random()}`]
        created = new Date
        state = `active`
debugger
        return Group.create({date, time, subevents, created, state})
        .then (group => console.log(group))  
    })

    // it('should delete the selected group', () =>
    //         deleteGroup(group.id)
    //             .then(() => {
    //                 expect(group.id).to.be.null
                    
    //             })
    //     )
    
  

    // after(() => Group.deleteMany().then(() => mongoose.disconnect()))

})