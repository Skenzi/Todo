const express = require('express')
const app = express();
const cors = require('cors');
const HttpErrors = require('http-errors');
const fs = require('fs');

const { Conflict, Unauthorized } = HttpErrors;

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000;

const users = [
    {
        username: 'Dimas',
        password: '123456',
        level: 1,
        exp: 0,
        stats: {
            agi: 10,
            str: 10,
            int: 10,
        },
        token: 'f1234f',
    },
]

const getTasks = () => {
    const data = fs.readFileSync('./data.json', 'utf-8')
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
    users.push(newUser);
    response.send(JSON.stringify(newUser))
})

app.post('/addTask', (req, res) => {
    const tasks = getTasks();
    const { task } = req.body;
    const nextId = tasks.length;
    const newTask = {...task, id: nextId};
    res.send(JSON.stringify(newTask));
    writeToFile('./data.json', [...tasks, newTask]);
})

app.delete('/deleteTask/:id', (req, res) => {
    const tasks = getTasks();
    const idTask = +req.params.id;
    const newTasks = tasks.filter(task => task.id !== idTask);
    res.send('Успешно удалено');
    writeToFile('./data.json', newTasks);
})

app.put('/updateTask', (req, res) => {
    const tasks = getTasks();
    const idTask = +req.params.id;
    const newTasks = tasks.filter(task => task.id !== idTask);
    res.send('Успешно обновлено');
    writeToFile('./data.json', newTasks);
})

app.post('/login', (request, response) => {
    const { username, password } = request.body;
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