const DataBase = require('../DataBase.js')


async function sendUserTasks(req, res, next){
    try{
    const tasks = await DataBase.poolUsersTasks(req.userName)
    res.json(tasks)
    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Error retrieving user tasks")
    }
}

async function addNewTask(req, res ,next){
    try{
        const [userID] = await DataBase.poolUserIdByName(req.userName)
        await DataBase.setNewTask(
                            req.body.taskID,
                            req.body.taskName,
                            userID.ID
                            )
        res.status(200).send('Task added successfuly!')
    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Error adding new task")
    }
}

module.exports = {
    sendUserTasks,
    addNewTask
}