const DataBase = require('../DataBase.js')


async function sendUserTasks(req, res, next){
    try{
    const tasks = await DataBase.poolUsersTasks(req.params.name)
    console.log(tasks)
    res.json(tasks)
    }
    catch(err){
        console.error(err.message)
        res.status(500)
    }
}

module.exports = {sendUserTasks}