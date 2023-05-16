//requires
const express = require('express')
const dotenv = require('dotenv')
//const DataBase = require('./DataBase.js')
const { useRouter } = require('./routes/users.js')

//configures the local env varibles
dotenv.config()

//app config
const PORT = process.env.APP_LOCAL_PORT
const app = express()

//uses
app.use(express.json()) //work with jsons
app.use('/users', useRouter) // users router
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

//in-case the server is down
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendStatus(500)
})

//app is active and listening on port
app.listen(3000, () => {
    console.log(`app is listening on port: ${PORT}`)
})




