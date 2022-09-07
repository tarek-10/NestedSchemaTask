const postModel = require("../../../model/post.model");
const { StatusCodes } = require("http-status-codes");
const { model } = require("mongoose");


const createCommentFun = async (req, res) => {
  try {
    const { postId } = req.params;
    const { desc } = req.body;

    const post = await postModel.findOne({ _id: postId });
    if (!post) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Post Not Found ...!" });
    } else {
      let urls = [];
      if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
          urls.push(process.env.IMAGE_URL + req.files[i].filename);
        }
      }

      post.comments.push({ commentPic: urls, desc, createdBy: req.user._id });

      const updatedPost = await postModel
        .findOneAndUpdate(
          { _id: post._id },
          {
            comments: post.comments,
          },
          { new: true }
        )
        .populate(
         [
             { 
            path: "userID",
            model:"user",
             select: "name  email location",
           
          },
          {
            path:"comments.createdBy",
            model:'user',
            select:"name email location"
          }
        
        ]
         

          
        )
      res.status(StatusCodes.CREATED).json({
        message: "success comment created successfully...!",
        updatedPost,
      });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = createCommentFun;
