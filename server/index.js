const express = require('express')
const app = express();
const aWss = require('express-ws')(app);
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;

const users = [
    {
        username: 'Dimas',
        password: '123456',
        token: 'f1234f',
    },
]

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
            case 'addUser':
                console.log('User added')
                break;
            case 'getUser':
                const currentUser = users.find(user => user.username === msg.username && user.password === msg.password);
                console.log('User getted', currentUser)
                ws.send(JSON.stringify({
                    event: 'getUser',
                    username: currentUser.username,
                    token: currentUser.token,
                }))
                break;
        }
    })
})

app.listen(PORT, () => console.log('server started!'))