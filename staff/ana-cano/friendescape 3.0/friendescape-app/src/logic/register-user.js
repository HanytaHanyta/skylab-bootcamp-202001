import { validate } from 'friendescape-utils'
const { NotAllowedError } = require('friendescape-errors')

//const { env: { REACT_APP_API_URL: API_URL } } = process
const API_URL = process.env.REACT_APP_API_URL


export default function (name, surname, email, telf, password) {

    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email)
    validate.string(telf, 'telf')
    // validate.type(telf, 'telf', Number)
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email, telf, password })
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
}
























// import { validate } from 'friendescape-utils'
// const { NotAllowedError } = require('friendescape-errors')
// //const { env: { REACT_APP_API_URL: API_URL } } = process
// const API_URL = process.env.REACT_APP_API_URL

// export default function (name, surname, email, telf, password) {
//     validate.string(name, 'name')
//     validate.string(surname, 'surname')
//     validate.string(email, 'email')
//     validate.email(email)
//     validate.number(telf, 'telf')
//     validate.string(password, 'password')

//     return (async () => {
//         const response = await fetch(`${API_URL}/users`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ name, surname, email, telf, password })
//         })
//         const { status } = response
//         if (status === 201) return
//         if (status >= 400 && status < 500) {
//             const { error } = await response.json()
//             if (status === 409) {
//                 throw new NotAllowedError(error)
//             }
//             throw new Error(error)
//         }
//         throw new Error('server error')
//     })()
// }