const HttpErrors = require('http-errors');
const { Conflict, Unauthorized } = HttpErrors;

const { loginService, signupService, userDataService } = require('../services/userServices');

const signupController = (request, response) => {
    try {
        const {username, password} = request.body;
        const user = signupService(username, password);
        response.send(JSON.stringify(user))
    } catch(err) {
        console.log(err)
        response.status(400).send('Уже есть такой')
    }
}

const loginController = (request, response) => {
    try {
        const { username, password } = request.body;
        const user = loginService(username, password);
        response.send(JSON.stringify(user))
    } catch(err) {
        response.status(401).send(new Unauthorized());
    }
}

const userDataController = (request, response) => {
    try {
        const token = request.headers.authorization;
        const data = userDataService(token);
        response.send(data);
    } catch(err) {
        response.status(401).send(new Unauthorized());
    }
}

module.exports = {
    userDataController,
    loginController,
    signupController
}