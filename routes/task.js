const express = require('express');
require('express-async-errors');
const router = express.Router();
const httpStatus = require('http-status');

// Repositories
const TaskRepository = require('../repositories/mysql/taskRepository');
const taskRepository = new TaskRepository();

const CacheRepository = require('../repositories/redis/cacheRepository');
const cacheRepository = new CacheRepository();

router.get('/', async (req, res) => {

   try {
      const tasks = await cacheRepository.get('task:all');

      res.status(httpStatus.OK).send(JSON.parse(tasks));
   } catch (err) {
      const tasks = await taskRepository.getTasks();

      await cacheRepository.set(`task:all`, JSON.stringify(tasks));

      res.status(httpStatus.OK).send(tasks);
   }

})

router.get('/:id', async (req, res) => {
   const {
      id
   } = req.params;

   const tasks = await taskRepository.getTask({
      id
   });

   await cacheRepository.set(`task:${id}`, JSON.stringify(tasks));

   res.status(httpStatus.OK).send(tasks);
})

module.exports = router;