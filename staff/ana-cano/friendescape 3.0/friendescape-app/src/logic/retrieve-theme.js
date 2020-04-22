import { NotAllowedError } from 'friendescape-errors'
import context from './context'

const API_URL = process.env.REACT_APP_API_URL

export default (function (query) {

    return (async () => {

        const response = await fetch(`${API_URL}/escaperooms/theme/${query}`, {
        
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const { status } = response

        if (status === 200) {
            const escapeRooms = await response.json()

            return escapeRooms
        }

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 401) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}).bind(context)