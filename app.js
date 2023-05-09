//requires
const express = require('express')
const dotenv = require('dotenv')
const DataBase = require('./DataBase.js')
const { useRouter } = require('./routes/users.js')

//configures the local env varibles
dotenv.config()

//app config
const PORT = process.env.APP_LOCAL_PORT
const app = express()

//uses
app.use(express.json()) //work with jsons
app.use('/users', useRouter) // users router

//in-case the server is down
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendStatus(500)
})

//app is active and listening on port
app.listen(3000, () => {
    console.log(`app is listening on port: ${PORT}`)
})




