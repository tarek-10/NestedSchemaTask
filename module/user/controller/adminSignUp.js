const { StatusCodes } = require("http-status-codes");
const userModel = require("../../../model/user.model");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../../middleware/sendEmail");

const adminSignUpFun = async (req, res) => {
  try {
    const { name, email, password, location, userImage } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      res.json({ message: " admin already exist ...!" });
    } else {
      let token = jwt.sign({ email }, process.env.privateKey);
      let message = `<a href='http://localhost:3000/verify/${token}'>verify your email</a>`;
      let imageUrl = process.env.IMAGE_URL + req.file.filename;

      const insertedAdmin = new userModel({
        name,
        email,
        password,
        location,
        userImage: imageUrl,
      });

      const newAdmin = await insertedAdmin.save();

      const newAdminAdded = await userModel.findOneAndUpdate(
        { _id: newAdmin._id },
        { role: "admin" },
        { new: true }
      );
      await sendEmail(email, message);

      res.status(StatusCodes.CREATED).json({message:"success",newAdminAdded});
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = adminSignUpFun;
