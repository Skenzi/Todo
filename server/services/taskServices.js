const { getTasks } = require('../features/taskFeatures');
const { getUsers } = require('../features/userFeatures');

const addTaskService = (task) => {
    const tasks = getTasks();
    const newTask = {...task, id: Date.now() + 1254};
    writeToFile('./data/data.json', [...tasks, newTask]);
    return newTask;
}

const deleteTaskService = (taskId) => {
    const tasks = getTasks();
    const newTasks = tasks.filter(task => task.id !== taskId);
    writeToFile('./data/data.json', newTasks);
    return 'deleted'
}

const compliteTaskService = (id, exp, level, userId, expNextLvl) => {
    const tasks = getTasks();
    const task = tasks.find(item => item.id === id);
    const users = getUsers();
    const user = users.find(user => user.username === userId);
    user.exp = exp;
    user.level = level;
    user.expNextLvl = expNextLvl;
    writeToFile('./data/users.json', users);

    task.status = 'complited';
    writeToFile('./data/data.json', tasks);

    return 'complited'
}

const changeTaskService = (id, property, value) => {
    const tasks = getTasks();
    const task = tasks.find(item => item.id === id)
    task[property] = value;
    writeToFile('./data/data.json', tasks);
    return 'changed';
}

module.exports = {
    addTaskService,
    deleteTaskService,
    changeTaskService,
    compliteTaskService
}