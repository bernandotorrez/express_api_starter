require('express-async-errors');
const { Task } = require('../../models')

class TaskRepository {
    constructor() {
        this._model = Task;
    }

    async getTasks() {
        return await this._model.findAll()
    }

    async getTask({ id = '' }) {
        if(id != '') {
            return await this._model.findOne({
                where: { id: id },
            })
        } else {
            throw new Error('ID not provided');
        }
    }
}

module.exports = TaskRepository;