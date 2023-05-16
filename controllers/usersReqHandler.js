const DataBase = require('../DataBase.js')

async function getAllUsers( req , res, next){
    try{
        const [users] = await DataBase.poolAllUser()
        console.log(users)
        res.json(users)
    }
    catch(err){
        console.error(err.message)
        res.status(500)
    }
    next()
}

async function getUserByName(req , res, next){
    try{
    const [user] = await DataBase.poolUser(req.params.name)
    res.json(user)
    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Error getting the requsted user")
    }
    next()
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
    next()
}

async function logInUser( req, res, next ){
    try{
        const [loged_user] = await DataBase.setLogInUser( req.body.userName , req.body.password )
        console.log(`user ${loged_user.name} is loged in sucssesfuly!`)
        res.json(logged_user)
        res.status(200).send('OK')
    }
    catch(err){
        console.error(err.message)
    }
    next()
}

module.exports = {
    getAllUsers,
    logInUser,
    insertNewUser,
    getUserByName
}