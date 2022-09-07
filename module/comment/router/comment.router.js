const express = require("express");
const handleValidation = require("../../../middleware/handleValidation");
const isAuthorized = require("../../../middleware/isAuthorized");
const upload = require("../../../middleware/multer");
const { CREATE_COMMENT } = require("../endPoints");
const { createCommentSchema } = require("../joi/comment.validation");

const router = express.Router();

//create comment
const createCommentFun = require("../conyroller/createComent");
router.post(
  "/coment/add/:postId",
  upload.array("image", 5),
  handleValidation(createCommentSchema),
  isAuthorized(CREATE_COMMENT),
  createCommentFun
);
//end

module.exports = router;
