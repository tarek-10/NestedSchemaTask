const express = require("express");
const handleValidation = require("../../../middleware/handleValidation");
const isAuthorized = require("../../../middleware/isAuthorized");
const { CREATE_POST, UPDATE_POST } = require("../endPoints");
const {
  createPostSchema,
  updatePostSchema,
} = require("../Joi/post.validation");
const upload = require("../../../middleware/multer");
const router = express.Router();

//add posts
const createPostFun = require("../controller/createPost");
router.post(
  "/post/add",
  upload.array("image", 5),
  handleValidation(createPostSchema),
  isAuthorized(CREATE_POST),
  createPostFun
);
//end

//update post
const updatePostFun = require("../controller/updatePost");
router.patch(
  "/post/update/:id",
  upload.array("image", 5),
  handleValidation(updatePostSchema),
  isAuthorized(UPDATE_POST),
  updatePostFun
);
//end

module.exports = router;
