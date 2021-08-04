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

    async updateTask({ id, body }) {
        if(id === '') {
            throw new Error('ID not Provided');
        }

        const data = {
            task: body.task,
            status: body.status
        }
        
        try {
            return this._model.update(data, { where: { id: id } })
        } catch (error) {
            throw new Error('Update Task Failed');
        }
    }

    async deleteTask({ id }) {
        if(id === '') {
            throw new Error('ID not Provided');
        }
        
        try {
            return this._model.delete({ where: { id: id } })
        } catch (error) {
            throw new Error('Delete Task Failed');
        }
    }
}

module.exports = TaskRepository;