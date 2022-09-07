const Joi = require("joi");

module.exports = {
  createCommentSchema: {
    body: Joi.object().required().keys({
      desc: Joi.string().required(),
    }),
    file: Joi.object().optional(),
    params: Joi.object().required().keys({
      postId: Joi.string().required(),
    }),
  },
};
