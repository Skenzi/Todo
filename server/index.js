const express = require('express')
const app = express();
const cors = require('cors');
const HttpErrors = require('http-errors');

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

const tasks = [
    {
        text: 'text',
        title: 'title',
        status: 'active',
        user: 'Dimas111',
        reward: 10,
        state: 'str',
        id: 1,
    },
    {
        text: 'text1',
        title: 'title1',
        status: 'complited',
        user: 'Dimas',
        reward: 10,
        state: 'str',
        id: 2,
    },
    {
        text: 'text2',
        title: 'title2',
        status: 'failed',
        user: 'Dimas',
        reward: 10,
        state: 'str',
        id: 3,
    },
    {
        text: 'text2',
        title: 'title2',
        status: 'failed',
        user: 'Dimas',
        reward: 10,
        state: 'str',
        id: 4,
    }
];

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
    const { task } = req.body;
    const nextId = tasks.length;
    const newTask = {...task, id: nextId};
    tasks.push(newTask);
    res.send(JSON.stringify(newTask));
})

app.post('/login', (request, response) => {
    const {username, password} = request.body;
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
    const data = tasks.filter((task) => task.user === user.username);

    response.send(JSON.stringify(data))
})

app.listen(PORT, () => console.log('server started!'))