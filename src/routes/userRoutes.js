import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import { fetchUserMiddleware } from "../middleware/authMidlleware/fetchUserMiddleware.js";

const userRouter = express.Router();

// insert new user route
userRouter.get("/profile", fetchUserMiddleware, getUserProfile);

export default userRouter;
