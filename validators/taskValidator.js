const Joi = require('@hapi/joi');

const AddTaskSchema = Joi.object({
    task: Joi.string().required(),
})

const AddTaskValidator = (payload) => {
    const validationResult = AddTaskSchema.validate(payload);

    if(validationResult.error) {
        throw new Error(validationResult.error.message);
    }
}

module.exports = {
    AddTaskValidator
}