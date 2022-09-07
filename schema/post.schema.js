const mongoose = require("mongoose");

const replaySchema = new mongoose.Schema({
    
  replayPic:{
   type:Array,
  },
  desc:{
   type:String,
   required:true
  },
  createdBy:{
   type:mongoose.Schema.Types.ObjectId,
   ref:'user'
  }
},{
timestamps:true
})

const commentSchema = new mongoose.Schema({
    
     commentPic:{
      type:Array,
     },
     desc:{
      type:String,
      required:true
     },
     createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
     },
     replays:[replaySchema],
},{
  timestamps:true
})

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    postImage: {
      type: Array,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    comments:[commentSchema]
  },
  {
    timestamps: true,
  }
);

module.exports = postSchema;
