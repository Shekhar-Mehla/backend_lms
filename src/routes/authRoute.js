import express from "express";
import {
  createNewUser,
  activateUser,
  loginUser,
  renewAcessJwt,
  getOtp,
  resetPasswordWithOtp,
  logOutUser,
} from "../controllers/authController.js";
import { loginUserMiddleWare } from "../middleware/authMidlleware/loginUserMiddleWare.js";
import { NewUserDataValidation } from "../middleware/joiValidation/dataValidation.js";

const authRouter = express.Router();

// insert new user route
authRouter.post("/register", NewUserDataValidation, createNewUser);
authRouter.post("/activate-user", activateUser);
authRouter.post("/logout", logOutUser);
authRouter.post("/login", loginUserMiddleWare, loginUser);
authRouter.get("/renew-accessJwt", renewAcessJwt);
authRouter.post("/get_otp", getOtp);
authRouter.put("/reset-password", resetPasswordWithOtp);

export default authRouter;
