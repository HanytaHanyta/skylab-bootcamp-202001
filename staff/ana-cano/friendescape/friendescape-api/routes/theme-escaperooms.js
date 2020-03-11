const { themeEscapeRooms } = require ('../logic')
const { NotAllowedError, ContentError } = require('friendescape-errors')

module.exports = (req, res) => {
    // const {param: {query}}= req
    const q = req.params.query
    try {
        themeEscapeRooms(q)
            .then(escapeRoomsTheme => res.json(escapeRoomsTheme))
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 409 // conflict

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
