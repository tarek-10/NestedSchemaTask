const { StatusCodes } = require("http-status-codes");
const postModel = require("../../../model/post.model");

const updatePostFun = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const post = await postModel.findOne({ _id: id, userID: req.user._id });
    console.log(post);
    if (!post) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "post not found ...!" });
    } else {
      let imageUrls = post.postImage;

      if (req.files) {
        imageUrls = [];

        for (let i = 0; i < req.files.length; i++) {
          imageUrls.push(process.env.IMAGE_URL + req.files[i].filename);
        }
      }
      const updatedPost = await postModel.findOneAndUpdate(
        { _id: post._id },
        {
          $set: body,
          postImage: imageUrls,
        },
        { new: true }
      ).populate("userID",["-password","-role","-email"] )

      res.status(StatusCodes.OK).json({ message: "success", updatedPost });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = updatePostFun;
