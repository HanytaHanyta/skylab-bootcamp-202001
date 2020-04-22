import { NotAllowedError } from 'friendescape-errors'
import context from './context'


const API_URL = process.env.REACT_APP_API_URL

export default (function () {
    return (async () => {

        const response = await fetch(`${API_URL}/deactivate`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        })

        const { status } = response

        if (status === 200) {
            
            return 
        }

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 401) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)
        }

    })()
}).bind(context)