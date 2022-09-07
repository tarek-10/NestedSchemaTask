const { StatusCodes, INSUFFICIENT_STORAGE } = require("http-status-codes");
const userModel = require("../../../model/user.model");
let jwt = require("jsonwebtoken");
const sendEmail = require("../../../middleware/sendEmail");

const userSignUpFun = async (req, res) => {
  try {
    const { name, email, password, location, userImage } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "user is already exist " });
    } else {
      let token = jwt.sign({ email: email }, process.env.privateKey);
      let message = `<a href='http://localhost:3000/verify/${token}'>verify your email</a>`;
      let imageUrl = process.env.IMAGE_URL + req.file.filename;

      const addedUser = new userModel({
        name,
        email,
        password,
        location,
        userImage: imageUrl,
      });
      const newUser = await addedUser.save();

      res.status(StatusCodes.CREATED).json({ message: "success", newUser });
      await sendEmail(email, message);
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = userSignUpFun;
