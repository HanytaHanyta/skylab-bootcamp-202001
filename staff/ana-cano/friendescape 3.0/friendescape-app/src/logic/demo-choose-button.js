const user = {
    "_id" : "5e972c4aaf55627613533abb",
    "pubevents" : [ 
        "5e975efe92b5bf0b69478174", 
        "5e975f5892b5bf0b69478175", 
        "5e9808ff3ac89f0b6b806da0"
    ],
    "foults" : 0,
    "trusty" : 3,
    "deactivated" : "0",
    "subbedTo" : [ 
        "5e938863a014466290a2db61", 
        "5e9388a4a014466290a2db62"
    ],
    "name" : "Ana",
    "surname" : "Cano",
    "email" : "anacano1985@gmail.com",
    "telf" : "55",
    "password" : "$2a$10$JPUZRnh0wQuiTWmC6oIJBeWiC7PIQmx2BDsiWz7orIq/44r3SVDH.",
    "__v" : 3
}

const group = {
    "_id" : "5e9808ff3ac89f0b6b806da0",
    "subevents" : [ 
        "5e972c4aaf55627613533abb"
    ],
    "date" : "2020-04-20T22:00:00.000Z",
    "time" : "2:45 pm",
    "state" : "inactive",
    "escapeRoom" : "5e67acb84a794ec5ac74f257",
    "created" : "2020-04-16T07:27:59.655Z",
    "__v" : 0
}

const {_id: groupId } = group

function isOwner ( user, groupId ) {
    const { pubevents } = user

    return (pubevents.some(_id => _id === groupId) )
}

function isJoined (group) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTk3MmM0YWFmNTU2Mjc2MTM1MzNhYmIiLCJpYXQiOjE1ODcwMjY0NzMsImV4cCI6MTU4NzExMjg3M30.EV_N73Q4ggtjunA17T6FuK_pH339dTET-hE7Hchv3V8";

    const id = JSON.parse(atob(token.split('.')[1])).sub
    
    const { subevents } = group

    return (subevents.some(_id => _id === id) )
}

if(isOwner(user, groupId)) {
    console.log('DELETE')
} else if (isJoined(group)) {
    console.log('LEAVE')
} else console.log('JOIN')