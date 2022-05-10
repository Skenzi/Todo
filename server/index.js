const express = require('express')
const app = express();
const aWss = require('express-ws')(app);
const fs = require('fs');
const path = require('path');
const cors = require('cors');

app.use(cors())
app.use(express.json())

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
    const currentUser = users.find(user => user.username === username && user.password === password);
    console.log('User getted', currentUser, request.body)
    response.send(JSON.stringify({
        username: currentUser.username,
        token: currentUser.token,
    }))
})

app.get('/data', () => {

})

app.listen(PORT, () => console.log('server started!'))