const postSchema = require("../schema/post.schema");
const mongoose = require("mongoose");
const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
