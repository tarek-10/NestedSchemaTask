const Joi = require("joi");

module.exports = {
  userSignUpShcema: {
    body: Joi.object()
      .required()
      .keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(3).max(15).required().label("Password"),
        password_confirmation: Joi.any()
          .equal(Joi.ref("password"))
          .required()
          .label("Confirm password")
          .options({ messages: { "any.only": "{{#label}} does not match" } }),
        location: Joi.string().required(),
      }),
  },
  userVerifyEmailSchema: {
    params: Joi.object().required().keys({
      token: Joi.string().required(),
    }),
  },
  userSignInSchema: {
    body: Joi.object().required().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  },
};
