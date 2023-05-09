const db = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

const connectInfo = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
}

//SELECTS
const poolAllUsersQuery = 'SELECT * FROM users'
const poolUserQuery = 'SELECT * FROM users where users.name = ?'
const insertUserQuery = 'INSERT INTO users (id, password ,name) VALUES (?, ?, ?)'
const logInUserQuery = 'SELECT* FROM users WHERE users.name = ? AND users.password = ?'
const deleteUserQuery = 'DELETE FROM `my_app`.`users` WHERE (`ID` = ?)'

const pool = db.createPool(connectInfo).promise()

//All users By ID selection:
    //All users selection:
    async function poolAllUser() {
        const [results] = await pool.query(poolAllUsersQuery)
        return results
        
    }
    //Call this one
    async function getAllUsers( req , res, next){
        try{
            const users = await poolAllUser()
            console.log(users)
            res.status(200).send("OK")
            next()
        }
        catch(err){
            console.error(err.message)
        }
    }

//User By name selection:
    //get user by id from DB
    async function poolUser(userName) {
            const [results] = await pool.query(poolUserQuery ,[userName])
            return results
    }
    //Call this one
    async function getUser(req , res, next){
        try{
        const user = await poolUser(req.params.id)
        console.log(user)
        res.status(200).send("OK")
        next()
        }
        catch(err){
            console.error(err.message)
            res.status(500).send("Error creating new user")
        }
    }
    
    //Inserts new user to DB
    async function setNewUser(userID, password, userName){
        const [results] = await pool.query(insertUserQuery, [userID, password, userName])
        return results
    }

    //Call this one
    async function insertNewUser( req, res, next ){
        try{
        const newUser_data = await setNewUser(
            req.body.id, 
            req.body.password,
            req.body.userName
            )
        console.log(newUser_data)
        getUser(req.body.id).then((result) => {
        console.log(result)
        res.status(201).send("OK")
    })
        }
        catch(err){
            console.error(err.message)
            res.status(500).send("Error creating new user")
        }
    }
    
    async function setLogInUser( userName, password ){
            const [results] = await pool.query(logInUserQuery ,[userName, password])
            if (Object.keys(results).length === 0) throw new Error('User or password are wrong, please try again!')
            console.log(results)
            return results
    }

    async function logInUser( req, res, next ){
        try{
            const loged_user = await setLogInUser( req.body.userName , req.body.password )
            console.log(`user ${loged_user.name} is loged in sucssesfuly!`)
            res.status(200).send('OK')
            next()
        }
        catch(err){
            console.error(err.message)
        }
    }

module.exports = {
    getAllUsers,
    getUser,
    insertNewUser,
    logInUser
}