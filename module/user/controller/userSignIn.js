const { StatusCodes } = require("http-status-codes");
const userModel = require("../../../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignInFun = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "user not found you should register firstly" });
    } else {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.sign(
          { _id: user._id, email: user.email, role: user.role },
          process.env.privateKey
        );

        res.status(StatusCodes.OK).json({
          message: "success",
          token,
          user: {
            _id: user._id,
            email: user.email,
            name: user.name,
          },
        });
      } else {
        res
          .status(StatusCodes.NOT_ACCEPTABLE)
          .json({ message: "invalid password ...!" });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = userSignInFun;
