const { StatusCodes } = require("http-status-codes");
const postModel = require("../../../model/post.model");

const createPostFun = async (req, res) => {
  try {
    const { title, desc } = req.body;

    let imageUrls = [];
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        imageUrls.push( process.env.IMAGE_URL + req.files[i].filename)
      }
    }
    const post = await postModel.insertMany({
      title,
      desc,
      postImage: imageUrls,
      userID: req.user._id,
    });

    res.status(StatusCodes.CREATED).json({ message: "success", post });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = createPostFun;
