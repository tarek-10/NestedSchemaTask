const { StatusCodes } = require("http-status-codes");
const postModel = require("../../../model/post.model");

const createReplayFun = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { desc } = req.body;

    const post = await postModel.findOne({ _id: postId });
    if (!post) {
      res.json({ message: "post not found ...!" });
    } else {
      let comment = post.comments.find((ele) => {
        return ele._id.toString() == commentId.toString();
      });
   
      if (!comment) {
        res.json({ message: "comment not found...!" });
      } else {

        let urls = [];
        if (req.files) {
          for (let i = 0; i < req.files.length; i++) {
            urls.push(process.env.IMAGE_URL + req.files[i].filename);
          }
        }

        for (let index = 0; index < post.comments.length; index++) {
          if (post.comments[index]._id.toString() == commentId.toString()) {
            post.comments[index].replays.push({
              replayPic: urls,
              desc,
              createdBy: req.user._id,
            });
          }
        }

        const updatedPost = await postModel
          .findOneAndUpdate(
            { _id: post._id },
            { comments: post.comments },
            { new: true }
          )
          .populate([
            { path: "userID", model: "user", select: "name location email" },
            { path: "comments.createdBy", model: "user", select: "name location email" },
            { path: "comments.replays.createdBy", model: "user", select: "name location email" },
          ]);

        res
          .status(StatusCodes.CREATED)
          .json({ message: "success", updatedPost });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = createReplayFun;
