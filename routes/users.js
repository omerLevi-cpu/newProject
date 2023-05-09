const express = require('express')
const userControl = require('../controllers/usersReqHandler.js')
const useRouter = express.Router()

useRouter.get("/:id", userControl.getUser)
useRouter.post("/logon", userControl.logInUser)
useRouter.post("/createNewUser", userControl.insertNewUser)

module.exports = { useRouter }