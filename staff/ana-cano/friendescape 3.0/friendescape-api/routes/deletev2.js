const { deleteGroup } = require ('../logic')
const { NotAllowedError, ContentError, NotFoundError } = require('friendescape-errors')

module.exports = (req, res) => {

    const { payload: { sub: userId }, params: { groupId } } = req


    try {
        deleteGroup(userId, groupId)

            .then(() => res.status(200).end())
            .catch(error => {
                let status = 400

                if (error instanceof NotAllowedError)
                    status = 409 // conflict

                if (error instanceof NotFoundError)
                    status = 404 // not found

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

        if (error instanceof NotFoundError)
            status = 404 // not found

        const { message } = error

        res
            .status(status)
            .json({
                error: message
            })
    }
}
