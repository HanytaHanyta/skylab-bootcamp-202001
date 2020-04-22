import { NotAllowedError } from 'friendescape-errors'
import context from './context'

const API_URL = process.env.REACT_APP_API_URL

export default (function () {
    return (async () => {
        
        const response = await fetch(`${API_URL}/groups/last`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const { status } = response

        if (status === 200) {
            const groups = await response.json()

            return groups
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