const { Task } = require('../../models')

class TaskRepository {
    constructor() {
        this._model = Task;
    }

    async getTasks() {
        return await this._model.findAll()
    }

    async getTask({ id = '' }) {
        if(id == '') {
            throw new Error('ID not provided');
        }

        return await this._model.findOne({
            where: { id: id },
        })
    }

    async addTask(params) {
        const data = {
            task: params.task
        }

        try {
            return this._model.create(data)
        } catch (error) {
            throw new Error('Add Task Failed');
        }
    }
}

module.exports = TaskRepository;