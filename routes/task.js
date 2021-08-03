const express = require('express');
require('express-async-errors');
const router = express.Router();
const httpStatus = require('http-status');

// Repositories
const TaskRepository = require('../repositories/mysql/taskRepository');
const taskRepository = new TaskRepository();

router.get('/', async (req, res) => {
   const tasks = await taskRepository.getTasks();

   res.status(httpStatus.OK).send(tasks);
})

router.get('/:id', async(req, res) => {
   const { id } = req.params;

   const tasks = await taskRepository.getTask({ id });
   res.status(httpStatus.OK).send(tasks);
})

module.exports = router;