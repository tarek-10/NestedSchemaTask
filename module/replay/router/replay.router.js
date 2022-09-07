const express = require("express");
const handleValidation = require("../../../middleware/handleValidation");
const isAuthorized = require("../../../middleware/isAuthorized");
const upload = require("../../../middleware/multer");
const { CREATE_REPLAY } = require("../endPoints");
const { createReplaySchema } = require("../joi/replay.validation");

const router = express.Router();

//create replay on comments
const createReplayFun = require("../controller/createReplay");
router.post(
  "/replay/add/:postId/:commentId",
  upload.array("image", 5),
  handleValidation(createReplaySchema),
  isAuthorized(CREATE_REPLAY),
  createReplayFun
);
//ends

module.exports = router;
