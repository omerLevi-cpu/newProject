const db = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

const connectInfo = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
}

//SELECTS
const poolAllUsersQuery = 'SELECT * FROM users'
const poolUserQuery = 'SELECT * FROM users where users.name = ?'
const insertUserQuery = 'INSERT INTO users (id, password ,name) VALUES (?, ?, ?)'
const logInUserQuery = 'SELECT* FROM users WHERE users.name = ? AND users.password = ?'
const deleteUserQuery = 'DELETE FROM my_app.users WHERE (users.id = ?)'
const poolUsersTasks = 'SELECT * FROM tasks where tasks.userID = ?'

const pool = db.createPool(connectInfo).promise()

pool.on('error', (err) => {
    throw new Error(err.message)
})

    //All users selection:
    async function poolAllUser() {
        const [results] = await pool.query(poolAllUsersQuery)
        return results
        
    }

    //get user by name from DB
    async function poolUser(userName) {
            const [results] = await pool.query(poolUserQuery ,[userName])
            return results
    }
    
    //Inserts new user to DB
    async function setNewUser(userID, password, userName){
        const [results] = await pool.query(insertUserQuery, [userID, password, userName])
        return results
    }

    async function setLogInUser( userName, password ){
            const [results] = await pool.query(logInUserQuery ,[userName, password])
            if (Object.keys(results).length === 0) throw new Error('User or password are wrong, please try again!')
            return results
    }


module.exports = {
    poolAllUser,
    poolUser,
    setNewUser,
    setLogInUser
}