const Joi = require("joi") ;


module.exports = {

    createReplaySchema:{
        body:Joi.object().required().keys({
            desc:Joi.string().required()
        }),
        params:Joi.object().required().keys({
            postId:Joi.string().required(),
            commentId:Joi.string().required()
        })
    }
}