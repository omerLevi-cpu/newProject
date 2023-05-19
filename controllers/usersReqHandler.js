const DataBase = require('../DataBase.js')

async function getAllUsers( req , res, next){
    try{
        const users = await DataBase.poolAllUser()
        res.json(users)
    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Error")
    }
}

async function getUserByName(req , res, next){
    try{
        console.log(req.params.name)
        const [user] = await DataBase.poolUser(req.params.name)
        console.log(user)
        res.json(user)
    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Error getting the requsted user")
    }
}

async function insertNewUser( req, res, next ){
    try{
    const newUser_data = await DataBase.setNewUser(
        req.body.id, 
        req.body.password,
        req.body.userName
        )
    const [newUser] = await DataBase.poolUser(req.body.userName)
    res.json(newUser)
    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Error creating new user")
    }
}

async function logInUser( req, res, next ){
    try{
        const [loged_user] = await DataBase.setLogInUser( req.body.userName , req.body.password )
        console.log(`user ${loged_user.name} is loged in sucssesfuly!`)
        res.json(logged_user)
    }
    catch(err){
        console.error(err.message)
        res.status(500).send(err.message)
    }
}

module.exports = {
    getAllUsers,
    logInUser,
    insertNewUser,
    getUserByName
}