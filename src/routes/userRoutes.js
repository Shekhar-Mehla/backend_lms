import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import { UserAuthMiddleware } from "../middleware/authMidlleware/UserAuthMiddleware.js";

const userRouter = express.Router();

// insert new user route
userRouter.get("/profile", UserAuthMiddleware, getUserProfile);

export default userRouter;
