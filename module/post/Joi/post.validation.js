const Joi = require("joi");

module.exports = {
  createPostSchema: {
    body: Joi.object().required().keys({
      title: Joi.string().required(),
      desc: Joi.string().required(),
    }),
    file: Joi.object().optional(),
  },
  updatePostSchema: {
    params: Joi.object().required().keys({
      id: Joi.string().required(),
    }),
    body:Joi.object().required().keys({
        title:Joi.string().optional(),
        desc:Joi.string().optional()
    })
  },
};
