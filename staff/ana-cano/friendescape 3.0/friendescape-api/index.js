require('dotenv').config()

const { env: { PORT = 8080, NODE_ENV: env, MONGODB_URL }, argv: [, , port = PORT] } = process

const express = require('express')
const winston = require('winston')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    listEscapeRooms,
    themeEscapeRooms,
    locationEscapeRooms,
    createGroup,
    difficultyEscapeRooms,
    minGamersEscapeRooms,
    maxGamersEscapeRooms,
    searchEscapeRooms,
    deleteGroup,
    deactivateUser,
    retrieveEscapeRoom,
    groupsUser,
    joinGroup,
    retrieveNextGroups,
    leaveGroup
} = require('./routes')

const { name, version } = require('./package')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const { jwtVerifierMidWare, cors } = require('./mid-wares')
const { mongoose } = require('friendescape-data')


mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const logger = winston.createLogger({
            level: env === 'development' ? 'debug' : 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ filename: 'server.log' })
            ]
        })

        if (env !== 'production') {
            logger.add(new winston.transports.Console({
                format: winston.format.simple()
            }))
        }

        const jsonBodyParser = bodyParser.json()

        const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

        const app = express()

        
        app.use(cors)

        app.use(morgan('combined', { stream: accessLogStream }))

        app.post('/users', jsonBodyParser, registerUser)

        app.post('/users/auth', jsonBodyParser, authenticateUser)

        app.get('/users', jwtVerifierMidWare, retrieveUser)

        app.get('/escaperooms', listEscapeRooms)
        
        app.get('/escaperooms/theme/:query', themeEscapeRooms)

        app.get('/escaperooms/search/:query', searchEscapeRooms)
        
        app.get('/escaperooms/mingamers/:query', minGamersEscapeRooms)

        app.get('/escaperooms/maxgamers/:query', maxGamersEscapeRooms)

        app.post('/create-group', authenticateUser)

        app.get('/escaperooms/location/:query', locationEscapeRooms)

        app.get('/escaperooms/difficulty/:query', difficultyEscapeRooms)

        app.post('/groups/escaperooms/:id', [jwtVerifierMidWare, jsonBodyParser],  createGroup)

        app.patch('/groups/delete/:groupId', jwtVerifierMidWare, deleteGroup)

        app.get('/escaperoom/:id', retrieveEscapeRoom)

        app.patch('/deactivate', jwtVerifierMidWare, deactivateUser)

        app.get('/groups-user', jwtVerifierMidWare, groupsUser)

        app.patch('/users/leave-group/:groupId', jwtVerifierMidWare, leaveGroup)

        app.patch('/users/join-group/:groupId', jwtVerifierMidWare, joinGroup)

        app.get('/groups/last', retrieveNextGroups)

        app.listen(port, () => console.log(`server ${name} ${version} up and running on port ${port}`))

        process.on('SIGINT', () => {
            logger.info('server abruptly stopped')

            process.exit(0)
        })
    })