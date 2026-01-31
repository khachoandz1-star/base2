import Joi from 'joi';
const schema = Joi.object({
    name: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.string().required(),
})
export default schema;