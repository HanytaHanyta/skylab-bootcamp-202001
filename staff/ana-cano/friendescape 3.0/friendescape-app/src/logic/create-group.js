import { validate } from 'friendescape-utils'
import context from './context'

const { NotAllowedError } = require('friendescape-errors')

//const { env: { REACT_APP_API_URL: API_URL } } = process
const API_URL = process.env.REACT_APP_API_URL


export default (function (id, date, time, state) {
    // validate.type(date, 'date', Date)
    validate.string(time, 'time')
    validate.string(state, 'state')

    return (async () => {
        const response = await fetch(`${API_URL}/groups/escaperooms/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            body: JSON.stringify({ date, time, state })
        })
        const { status } = response
        if (status === 201) return
        if (status >= 400 && status < 500) {
            const { error } = await response.json()
            if (status === 409) {
                throw new NotAllowedError(error)
            }
            throw new Error(error)
        }
        throw new Error('server error')
    })()
}).bind(context)








