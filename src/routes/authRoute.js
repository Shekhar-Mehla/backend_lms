import express from "express";
import { createNewUser, activateUser,loginUserAuthenticater } from "../controllers/authController.js";

const authRouter = express.Router();

// insert new user route
authRouter.post("/register", createNewUser);
authRouter.post("/activate-user", activateUser);
authRouter.post("/login", loginUserAuthenticater);
export default authRouter;
