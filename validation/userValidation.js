const Joi = require('joi');

const userSchema = Joi.object({
  string: Joi.string().min(3).max(10).required(),
  numero: Joi.number().required(),
  booleano: Joi.boolean().required()
});

module.exports = {
  userSchema
};
