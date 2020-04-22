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
      
            user.trusty++
            user.save()

            return Promise.all([User.findByIdAndUpdate(userId, { $addToSet: { subbedTo: groupId } }), Group.findByIdAndUpdate(groupId, { $addToSet: { subevents: userId } }).populate('subevents', 'name surname email').populate('escapeRoom', 'title')
            
            ])
        
        //.then(() => { })
        .then(([user, group]) => {

            const { email, name, surname} = user
            const {date, time, escapeRoom:{title}} = group
            let members = ''
            for (let i = 0; i < group.subevents.length; i++) members += `\n\t\t${i+1}: ${group.subevents[i].name}, ${group.subevents[i].surname}, ${group.subevents[i].email}\n`;
            const body = `Hi ${name} ${surname}, 
            Here do you have the information about your next appointment:
            Escape Room: ${title},
            Date: ${date},
            Time: ${time},
            Just in case you need to contact with your team members: ${members},
            If your group appears in green this means that the group is completed.
            You will earn one trusty point per each group that you create or join.
            You can check your trusty points in your profile.
            More points, more chances to win one of our prizes. 
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
                    subject: 'Congrats, you joined a group',
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







