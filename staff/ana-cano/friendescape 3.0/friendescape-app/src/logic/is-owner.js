
export default function ( user, groupId ) {
    if(typeof user !== 'object') throw new Error ('invalid input for user')
    
    //TODO validates user and groupId

    const { pubevents } = user

    return (pubevents.some(_id => _id === groupId) )
}