import express from "express";
import { getUserProfile, logOutUser } from "../controllers/userController.js";
import { UserAuthMiddleware } from "../middleware/authMidlleware/UserAuthMiddleware.js";

const userRouter = express.Router();

// insert new user route
userRouter.get("/profile", UserAuthMiddleware, getUserProfile);
userRouter.post("/logout", UserAuthMiddleware, logOutUser);

export default userRouter;
