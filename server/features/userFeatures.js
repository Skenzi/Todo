const fs = require('fs')
const { getTasks } = require('./taskFeatures');

const getUsers = () => {
    const data = fs.readFileSync('./data/users.json', 'utf-8')
    return JSON.parse(data);
}
const getDataUser = (user) => {
    const data = getTasks();
    return data.filter((task) => task.user === user.username);
}

module.exports = {
    getUsers,
    getDataUser
}