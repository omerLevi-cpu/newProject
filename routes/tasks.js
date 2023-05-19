const express = require('express')
const tasksControl = require('../controllers/tasksReqHandler.js')
const taskRouter = express.Router()


taskRouter.get("/all", tasksControl.sendUserTasks)
taskRouter.post("/newTask", tasksControl.addNewTask)
//taskRouter.post("/changeTaskStatus", tasksControl.changeTaskStatus)



module.exports = {taskRouter}