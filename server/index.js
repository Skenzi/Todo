const express = require('express')
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 5000;

app.on('/', (ws, request) => {
    ws.on('message', (msg) => {
        const message = JSON.parse(msg);
        switch(message.event) {
            case 'connection': 
                console.log('User connected')
        }
    })
})

app.listen(PORT, () => console.log('server started!'))