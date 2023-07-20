const express = require('express');
const router = express.Router();

const { signupController, loginController, userDataController } = require('../controlles/userControlles');
const { addTaskController, changeTaskController, deleteTaskController, compliteTaskController } = require('../controlles/taskControllers');

router.post('/signup', signupController)
router.post('/login', loginController)
router.get('/data', userDataController)
router.post('/addTask', addTaskController)
router.delete('/deleteTask/:id', deleteTaskController)
router.put('/compliteTask', compliteTaskController)
router.put('/changeTask', changeTaskController)

module.exports = router;