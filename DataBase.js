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
const getUserId= 'SELECT ID from users WHERE name = ?'
const poolUserQuery = 'SELECT * FROM users where users.name = ?'
const insertUserQuery = 'INSERT INTO users (id, password ,name) VALUES (?, ?, ?)'
const logInUserQuery = 'SELECT* FROM users WHERE users.name = ? AND users.password = ?'
const deleteUserQuery = 'DELETE FROM my_app.users WHERE (users.id = ?)'
const getUsersTasks = `SELECT t.name as task_name, t.status as status from tasks as t
                        INNER JOIN users as u on u.ID = t.userId
                        WHERE u.name = ?`
const insertNewTask = 'INSERT INTO tasks (task_ID, name ,userID ,status) VALUES (?, ?, ?, 0)'
const modifyTaskStatus = 'UPDATE tasks SET status = ? WHERE (name = ?)'

const pool = db.createPool(connectInfo).promise()

pool.on('error', (err) => {
    throw new Error(err.message)
})

//users
    async function poolUserIdByName(userName){
        const [results] = await pool.query(getUserId, [userName])
        return results
    }
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
        try{
            const [results] = await pool.query(insertUserQuery, [userID, password, userName])
            return results
        }
        catch(err){
            console.error(err.message)
        }
    }

    async function setLogInUser( userName, password ){
            const [results] = await pool.query(logInUserQuery ,[userName, password])
            if (Object.keys(results).length === 0) throw new Error('User or password are wrong, please try again!')
            return results
    }



    //tasks
    async function poolUsersTasks(userName){
        const [results] = await pool.query(getUsersTasks, [userName])
        return results
    }

    async function setNewTask(taskID, taskName, userName){
            const [results] = await pool.query(insertNewTask, [taskID, taskName, userName])
            return results
    }

    async function setTaskStatus (taskStatus ,taskName){
        const [results] = await pool.query(modifyTaskStatus, [taskStatus, taskName])
        return results
    }

module.exports = {
    poolUserIdByName,
    poolAllUser,
    poolUser,
    setNewUser,
    setLogInUser,
    poolUsersTasks,
    setNewTask,
    setTaskStatus
}