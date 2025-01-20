import express from "express";
import { getUserProfile } from "../controllers/userController.js";

const userRouter = express.Router();

// insert new user route
userRouter.get("/profile", getUserProfile);

export default userRouter;
