const express = require('express')
const app = express();
const cors = require('cors');
const HttpErrors = require('http-errors');
const fs = require('fs');

const { Conflict, Unauthorized } = HttpErrors;

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000;

const getTasks = () => {
    const data = fs.readFileSync('./data/data.json', 'utf-8')
    return JSON.parse(data);
}

const getUsers = () => {
    const data = fs.readFileSync('./data/users.json', 'utf-8')
    return JSON.parse(data);
}

const writeToFile = (path, data) => {
    const json = JSON.stringify(data);
    fs.writeFileSync(path, json);
}

const getDataUser = (user) => {
    const data = getTasks();
    return data.filter((task) => task.user === user.username);
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

app.post('/signup', (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    const users = getUsers();
    const user = users.find(user => user.username === username);
    if(user) {
        response.status(403).send(new Conflict());
        return;
    }
    const newUser = {
        username,
        password,
        token: Date.now().toString(16),
    }
    writeToFile('./data/users.json', [...users, newUser]);
    response.send(JSON.stringify(newUser))
})

app.post('/addTask', (req, res) => {
    const tasks = getTasks();
    const { task } = req.body;
    const nextId = tasks.length;
    const newTask = {...task, id: nextId};
    res.send(JSON.stringify(newTask));
    writeToFile('./data/data.json', [...tasks, newTask]);
})

app.delete('/deleteTask/:id', (req, res) => {
    const tasks = getTasks();
    const idTask = +req.params.id;
    const newTasks = tasks.filter(task => task.id !== idTask);
    res.send('Успешно удалено');
    writeToFile('./data/data.json', newTasks);
})

app.put('/compliteTask', (req, res) => {
    const { id, exp, level } = req.body;
    const tasks = getTasks();
    const task = tasks.find(item => item.id === id)
    task.status = 'complited';
    try {
        res.send('Успешно изменено')
    } catch(e) {
        res.send('Не удалось перезаписать')
    }
    writeToFile('./data/data.json', tasks);
})

app.put('/changeTask', (req, res) => {
    const { id, property, value } = req.body;
    const tasks = getTasks();
    const task = tasks.find(item => item.id === id)
    task[property] = value;
    try {
        res.send('Успешно изменено')
    } catch(e) {
        res.send('Не удалось перезаписать')
    }
    writeToFile('./data/data.json', tasks);
})

app.post('/login', (request, response) => {
    const { username, password } = request.body;
    const users = getUsers();
    const user = users.find(user => user.username === username && user.password === password);
    if(!user) {
        response.status(401).send(new Unauthorized());
        return;
    }
    response.send(JSON.stringify({
        username: user.username,
        level: user.level,
        stats: user.stats,
        exp: user.exp,
        token: user.token,
    }))
})

app.get('/data', (request, response) => {
    const token = request.headers.authorization;
    const users = getUsers();
    const user = users.find(user => user.token === token);
    if(!user) {
        response.status(401).send(new Unauthorized());
        return;
    }
    const data = getDataUser(user);
    response.send(data);
})

app.listen(PORT, () => {
    console.log('server started!');
})