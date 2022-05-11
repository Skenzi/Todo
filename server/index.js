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
        id: 'f1234f',
    },
]

const tasks = [
    {
        text: 'text',
        title: 'title',
        userId: 'f1234f',
        status: 'active',
        user: 'Dimas',
        id: 1,
    },
    {
        text: 'text1',
        title: 'title1',
        userId: 'f1234f',
        status: 'complited',
        user: 'Dimas',
        id: 2,
    },
    {
        text: 'text2',
        title: 'title2',
        userId: 'f1234f',
        status: 'failed',
        user: 'Dimas',
        id: 3,
    },
    {
        text: 'text2',
        title: 'title2',
        userId: 'f1233234f',
        status: 'failed',
        user: 'Dimas',
        id: 4,
    }
];

app.ws('/', (ws, request) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        switch(msg.event) {
            case 'connection': 
                console.log('User connected')
                ws.send(JSON.stringify({
                    name: 'user'
                }))
                break;
            case 'signUp':
                console.log('User added')
                break;
            case 'getData':

        }
    })
})

app.post('/signup', (user) => {
    console.log(user)
})

app.post('/login', (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    const user = users.find(user => user.username === username && user.password === password);
    console.log('User getted', user, request.body)
    if(!user) {
        response.status(401).send(new Unauthorized());
        return;
    }
    response.send(JSON.stringify({
        username: user.username,
        token: user.id,
    }))
})

app.get('/data', (request, response) => {
    const token = request.headers.authorization.split('Bearer ').join('');
    const user = users.find(user => user.id === token);
    if(!user) {
        response.send(new Unauthorized());
    }
    const data = tasks.filter((task) => task.userId === token)
    console.log(data)
    response.send(JSON.stringify(data))
})

app.listen(PORT, () => console.log('server started!'))