const {validate} = require('utils')


module.exports = function (param) {
    validate.string(param)

    //async-await

    (async ()=> {
        //montar la función asincrona

        const user = await Model.findById(id)

        const userId = user._id
    })()
}

//promise

Promise(blablabla)
.then(function (user) { userId = user._id} )