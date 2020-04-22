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
            return Promise.all([ Group.findByIdAndUpdate(groupId, { $pull: { subevents: userId } }).populate('escapeRoom', 'title'),User.findByIdAndUpdate(userId, { $inc: { foults: 1 } } ).populate('subbedTo', 'date time') ])
            
        .then(([user, group]) => {

            const {date, time, escapeRoom :{title}} = user
            const {name, surname, email} = group
            const body = `Hi ${name} ${surname}, 
            Here do you have the information the team that you just leaved:
            Escape Room: ${title},
            Date: ${date},
            Time: ${time},
            
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
                    subject: 'Bad news, you leave a group',
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
