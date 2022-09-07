const { StatusCodes } = require("http-status-codes");
const userModel = require("../../../model/user.model");
const jwt = require("jsonwebtoken");

const userVerifyFun = async (req, res) => {
  try {
    const { token } = req.params;
    let decoded = jwt.verify(token, process.env.privateKey);

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ messgae: "user not found" });
    } else {
      if (user.isConfirmmed == true) {
        res.json({ message: "User Is Already Confirmed ...!" });
      } else {
        const confirmedUser = await userModel.findByIdAndUpdate(
          { _id: user._id },
          { isConfirmmed: true },
          { new: true }
        );

        res
          .status(StatusCodes.OK)
          .json({ message: "success confirmed", confirmedUser });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};

module.exports = userVerifyFun;
