const express = require('express')
const app = express();
const cors = require('cors');
const router = require('./routers/routers');

app.use(cors())
app.use(express.json())
app.use('/', router)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('server started!');
})