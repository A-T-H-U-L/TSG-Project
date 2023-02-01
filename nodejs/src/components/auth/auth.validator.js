const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: ''
    }
  }
};
// .pattern(/^[6-9]\d{9}$/)
const validateLogin = (httpRequest) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .messages({
        'string.pattern.base': 'Provide valid email!'
      }),
    password: Joi.string().min(7).alphanum().required()
  });
  return schema.validate(httpRequest.body, options);
};

module.exports = {
  validateLogin
};
