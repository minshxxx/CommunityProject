const db = require('./models')

const getUsers = async() => {
    await db.Sites.findAll()
    .then( (value) => {
        console.log(value)
    })
}

getUsers()