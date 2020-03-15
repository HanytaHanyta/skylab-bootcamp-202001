module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    listEscapeRooms: require('./list-escaperooms'),
    themeEscapeRooms: require('./theme-escaperooms'),
    createGroup: require('./create-group'),
    locationEscapeRooms: require('./location-escaperooms'),
    difficultyEscapeRooms: require('./difficulty-escaperooms'),
    minGamersEscapeRooms: require('./mingamers-escaperooms'),
    maxGamersEscapeRooms: require('./maxgamers-escaperooms'),
    searchEscapeRooms: require('./search-escaperooms'),
    deleteGroup: require('./delete-group'),
    deactivateUser: require('./deactivate-user'),
    retrieveEscapeRoom: require('./retrieve-escaperoom'),
    groupsUser: require('./groups-user'),
    joinGroup: require('./join-group'),
    retrieveNextGroups: require('./retrieve-next-groups')
    // retrieveLastEvents: require('./retrieve-last-events'),
    // retrievePublishedEvents: require('./retrieve-published-events'),
    // subscribeEvent: require('./subscribe-event')
}