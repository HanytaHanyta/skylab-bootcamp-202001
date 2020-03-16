const { createGroup } = require('../logic')
const { ContentError } = require('friendescape-errors')

module.exports = (req, res) => {
    const {params: {id : escaperoomId}, payload: { sub: userId }, body: {date, time, state}} = req
    try {
        createGroup(escaperoomId, userId, date, time, state)
            .then(() => res.status(201).end())
            .catch(error => {
                let status = 400

                const { message } = error

                res
                    .status(status)
                    .json({
                        error: message
                    })
            })
    } catch (error) {
        let status = 400

        if (error instanceof TypeError || error instanceof ContentError)
            status = 406 // not acceptable

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}