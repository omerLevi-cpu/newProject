const express = require('express')
const DataBase = require('../DataBase.js')
const useRouter = express.Router()

useRouter.get("/:id", DataBase.getUser)
useRouter.post("/logon", DataBase.logInUser)
useRouter.post("/createNewUser", DataBase.insertNewUser)

module.exports = { useRouter }