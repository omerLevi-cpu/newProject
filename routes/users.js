const express = require('express')
const userControl = require('../controllers/usersReqHandler.js')
const tasksControl = require('../controllers/tasksReqHndler.js')
const useRouter = express.Router()

useRouter.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

useRouter.get("/:name/tasks", tasksControl.sendUserTasks)

useRouter.get("/:name", userControl.getUserByName)
useRouter.post("/logon", userControl.logInUser)
useRouter.get("/all", userControl.getAllUsers)
useRouter.post("/createNewUser", userControl.insertNewUser)


module.exports = { useRouter }