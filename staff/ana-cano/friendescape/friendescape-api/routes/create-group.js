const { createGroup } = require('../logic')
const { ContentError } = require('friendescape-errors')

module.exports = ({payload, params, body}, res) => {

        console.log(payload)
    try {
        createGroup(params.id, payload.sub, body)
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