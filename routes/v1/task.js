const express = require('express');
const { route } = require('express/lib/router');
require('express-async-errors');
const router = express.Router();
const httpStatus = require('http-status');

// Repositories
const TaskRepository = require('../../repositories/mysql/taskRepository');
const taskRepository = new TaskRepository();

const CacheRepository = require('../../repositories/redis/cacheRepository');
const cacheRepository = new CacheRepository();

router.get('/', async (req, res) => {
   try {
      const tasks = await cacheRepository.get('task:all');

      res.status(httpStatus.OK).send(JSON.parse(tasks));
   } catch (err) {
      const tasks = await taskRepository.getTasks();

      await cacheRepository.set(`task:all`, JSON.stringify(tasks), 60);

      res.status(httpStatus.OK).send(tasks);
   }

})

router.get('/:id', async (req, res) => {
   const {
      id
   } = req.params;

   try {
      const tasks = await cacheRepository.get(`task:${id}`);

      res.status(httpStatus.OK).send(JSON.parse(tasks));
   } catch (error) {
      const tasks = await taskRepository.getTask({
         id
      });
   
      await cacheRepository.set(`task:${id}`, JSON.stringify(tasks), 60);
   
      res.status(httpStatus.OK).send(tasks);
   }
})

router.post('/', async (req, res) => {
   try {
      console.log(req.body)
      const task = await taskRepository.addTask(req.body);

      if(task) {
         await cacheRepository.delete(`task:all`);
      }

      res.status(httpStatus.CREATED).send('ok');
   } catch (error) {
      res.status(httpStatus.OK).send(error.message)
   }
})

module.exports = router;