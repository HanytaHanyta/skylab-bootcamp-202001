const { models: { Group, User } } = require('friendescape-data')
const { validate } = require('friendescape-utils')
const { NotFoundError} = require('friendescape-errors')
const nodemailer = require('nodemailer')



module.exports = (userId, groupId) => {
    validate.string(userId, 'userId')

    validate.string(groupId, 'groupId') 

    return Promise.all([User.findById(userId), Group.findById(groupId)])
        .then(([user, group]) => {
            if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)
            if (!group) throw new NotFoundError(`group with id ${groupId} does not exist`)
            user.foults++
            user.save()
            return Promise.all([User.findByIdAndUpdate(userId, { $pullAll: { subbedTo: [groupId] } } ), Group.findByIdAndUpdate(groupId, { $set:{ state: "inactive" } } ).populate('subevents', 'name surname email').populate('escapeRoom', 'title')])
    
        .then(([user, group]) => {
            debugger
            const {name, surname, email}= user
            const {date, time, escapeRoom:{title}} = group
            let members = ''
            for (let i = 0; i < group.subevents.length; i++) members += `\n\t\t${i+1}: ${group.subevents[i].name}, ${group.subevents[i].surname}, ${group.subevents[i].email}\n`;
            const body = `Hi ${name} ${surname}, 
            Here do you have the information about the team that you just deleted, please inform the rest of the team.
            Escape Room: ${title},
            Date: ${date},
            Time: ${time},
            Group Members: ${members},

            Aditional information: 
            
            You will earn one trusty point per each group that you create or join.
            You can check your trusty points in your profile.
            More points, more chances to win one of our prizes. On the other hand if you delete groups, you will receive a foult. If you commit 3 foults you will be banned from our group. 

            If you have any issue please, don't hesitate to contact us:
            Email: friendescape@friendescape.com
            Office: 9 Land Street Toowong, Brisbane (8-18h)
            
            THE TEAM OF FRIENDESCAPE`

            
            transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'programadoraenapuros@gmail.com',
                    pass: 'SkyLabProyecto'
                }
            })
            
                mailOptions = {
                    from: 'FriendEscape',
                    to: `${email}`,
                    subject: 'We hope to see you soon',
                    text: body
    

              }
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
              
            })
        })
        .then(() => {})
    })
}
