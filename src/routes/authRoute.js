import express from "express";
import {
  createNewUser,
  activateUser,
  loginUser,
  renewAcessJwt,
} from "../controllers/authController.js";
import { loginUserMiddleWare } from "../middleware/authMidlleware/loginUserMiddleWare.js";

const authRouter = express.Router();

// insert new user route
authRouter.post("/register", createNewUser);
authRouter.post("/activate-user", activateUser);
authRouter.post("/login", loginUserMiddleWare, loginUser);
authRouter.get("/renew-accessJwt", renewAcessJwt);

export default authRouter;
