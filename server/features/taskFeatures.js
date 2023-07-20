const { writeToFile } = require('./features')

const getTasks = () => {
    const data = fs.readFileSync('./data/data.json', 'utf-8')
    return JSON.parse(data);
}

const updateTasks = () => {
    const tasks = getTasks();
    for(const task of tasks) {
        const now = Date.now();
        if(task.date < now) {
            task.status = 'failed';
        }
    }
    writeToFile('./data.json', tasks);
}

module.exports = {
    getTasks,
    updateTasks
}