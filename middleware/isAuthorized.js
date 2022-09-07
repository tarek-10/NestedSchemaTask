const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const rbac = require("../rbac/rbac");

module.exports = (endPointsName) => {

  return async (req, res, next) => {

    if (req.headers.authorization) {
        
      const token = req.headers.authorization.split(" ")[1];

      if (token) {
        try {
          let decoded = jwt.verify(token, process.env.privateKey);
          req.user = decoded;

          const isExist = await userModel.findOne({ email: req.user.email });

          if (isExist) {
            const isAllowed = await rbac.can(req.user.role, endPointsName);

            if (isAllowed) {
              next();
            } else {
              res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "UNAUTHORIZED" });
            }
          } else {
            res
              .status(StatusCodes.UNAUTHORIZED)
              .json({ message: "UNAUTHORIZED" });
          }
        } catch (error) {
          res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ message: "UNAUTHORIZED" });
        }
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
      }
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" });
    }
  };
};
