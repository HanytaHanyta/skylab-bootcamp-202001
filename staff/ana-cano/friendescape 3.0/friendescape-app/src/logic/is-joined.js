import context from './context'
export default (function (group) {

    if(typeof group !== 'object') throw new Error ('invalid input for group')
    
    const id = JSON.parse(atob(this.token.split('.')[1])).sub

    
    const { subevents } = group

    return subevents.some(item => item._id === id)
}).bind(context)