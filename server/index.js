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
        const message = JSON.parse(msg);
        switch(message.event) {
            case 'connection': 
                console.log('User connected')
                break;
            case 'addUser':
                console.log('User added')
                break;
            case 'getUser':
                const currentUser = users.find(user => user.username === message.username && user.password === message.password);
                console.log('User getted')
                ws.send(JSON.stringify({
                    username: currentUser.username,
                    token: currentUser.token,
                }))
                break;
        }
    })
})

app.listen(PORT, () => console.log('server started!'))