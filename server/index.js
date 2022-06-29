const express = require('express')
const app = express();
const aWss = require('express-ws')(app);
const fs = require('fs');
const path = require('path');
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

app.ws('/', (ws, request) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        switch(msg.event) {
            case 'connection': 
                console.log('User connected')
                break;
            case 'signUp':
                console.log('User added')
                break;
            case 'newTask':
                const nextId = tasks.length + 1;
                tasks.push({...msg.task, id: nextId})
                console.log(tasks.length, nextId)
                ws.send(JSON.stringify({
                    task: tasks[nextId - 1],
                    event: 'newTask'
                }));
                break;
            case 'changeTask':
                break;  
        }
    })
})

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

app.post('/login', (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
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