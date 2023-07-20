const { getUsers, getDataUser } = require('../features/userFeatures');
const { writeToFile } = require('../features/features');

const signupService = (username, password) => {
    const users = getUsers();
    const user = users.find(user => user.username === username);
    if(user) {
        throw new Error('Уже есть такой!')
    }
    const newUser = {
        username,
        password,
        token: Date.now().toString(16),
    }
    writeToFile('./data/users.json', [...users, newUser]);
    return newUser;
}

const loginService = (username, password) => {
    const users = getUsers();
    const user = users.find(user => user.username === username && user.password === password);
    if(!user) {
        throw new Error('Нет такого!')
    }
    return {
        username: user.username,
        level: user.level,
        stats: user.stats,
        exp: user.exp,
        token: user.token,
        expNextLvl: user.expNextLvl,
    }
}

const userDataService = (token) => {
    const users = getUsers();
    const user = users.find(user => user.token === token);
    if(!user) {
        throw new Error('Проблемы с данными!')
    }
    const data = getDataUser(user);
    return data;
}

module.exports = {
    userDataService,
    loginService,
    signupService
}