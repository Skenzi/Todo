const HttpErrors = require('http-errors');
const { Conflict, Unauthorized } = HttpErrors;

const { addTaskService, deleteTaskService, changeTaskService, compliteTaskService} = require('../services/taskServices');

const addTaskController = (req, res) => {
    try {
        const { task } = req.body;
        const newTask = addTaskService(task);
        res.send(JSON.stringify(newTask));
    } catch(err) {
        res.status(400).send('Error');
    }
}

const deleteTaskController = (req, res) => {
    try {
        deleteTaskService(+req.params.id);
        res.send('Успешно удалено');
    } catch(err) {
        res.status(400).send('Error');
    }
}

const compliteTaskController = (req, res) => {
    try {
        const { id, exp, level, userId, expNextLvl } = req.body;
        compliteTaskService(id, exp, level, userId, expNextLvl)
        res.send('Успешно изменено')
    } catch(err) {
        res.status(400).send('Error');
    }
}

const changeTaskController = (req, res) => {
    try {
        const { id, property, value } = req.body;
        changeTaskService(id, property, value)
        res.send('Успешно изменено')
    } catch(err) {
        res.status(400).send('Error');
    }
}

module.exports = {
    addTaskController,
    deleteTaskController,
    changeTaskController,
    compliteTaskController
}