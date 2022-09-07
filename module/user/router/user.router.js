const express = require("express");
const handleValidation = require("../../../middleware/handleValidation");
const {
  userSignUpShcema,
  userVerifyEmailSchema,
  userSignInSchema,
} = require("../joi/user.validation");
const upload = require("../../../middleware/multer");

const router = express.Router();

//CREATE USER
const userSignUpFun = require("../controller/userSignup");
router.post(
  "/user/signup",
  upload.single("image"),
  handleValidation(userSignUpShcema),
  userSignUpFun
);
//END

//create admin
const adminSignUpFun = require("../controller/adminSignUp");
router.post(
  "/admin/signup",
  upload.single("image"),
  handleValidation(userSignUpShcema),
  adminSignUpFun
);
//end

//verify email
const userVerifyFun = require("../controller/userVerify");
router.get(
    "/verify/:token",
    handleValidation(userVerifyEmailSchema),
    userVerifyFun
    );
    //end
    
    //user sign in
    const userSignInFun = require("../controller/userSignIn");
router.post("/user/signin", handleValidation(userSignInSchema) ,userSignInFun);
//end

module.exports = router;
