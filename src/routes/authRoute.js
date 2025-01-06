import express from "express";
import { createNewUser, activateUser } from "../controllers/authController.js";

const UserRouter = express.Router();

// insert new user route
UserRouter.post("/register", createNewUser);
UserRouter.post("/activate-user", activateUser);
export default UserRouter;
