const express = require('express')
const userControl = require('../controllers/usersReqHandler.js')
const useRouter = express.Router()
const { taskRouter } = require('./tasks.js')

useRouter.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

useRouter.use('/:name/tasks', (req, res, next) =>{
  req.userName = req.params.name
  next()
}, taskRouter)

  
  useRouter.post("/logon", userControl.logInUser)
  useRouter.get("/all", userControl.getAllUsers)
  useRouter.post("/createNewUser", userControl.insertNewUser)
  useRouter.get("/:name", userControl.getUserByName)
  

module.exports = { useRouter }