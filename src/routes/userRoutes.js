import express from "express";
import {
  getUserProfile,
  logOutUser,
  getAllUserList,
} from "../controllers/userController.js";
import { UserAuthMiddleware } from "../middleware/authMidlleware/UserAuthMiddleware.js";
import { AdminAuthMidlleware } from "../middleware/authMidlleware/AdminAuthMiddleware.js";

const userRouter = express.Router();

// insert new user route
userRouter.get("/profile", UserAuthMiddleware, getUserProfile);
userRouter.get(
  "/all-users",
  UserAuthMiddleware,
  AdminAuthMidlleware,
  getAllUserList
);
userRouter.post("/logout", UserAuthMiddleware, logOutUser);

export default userRouter;
