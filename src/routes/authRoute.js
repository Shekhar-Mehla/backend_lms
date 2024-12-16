import express from "express";
import { createNewUser } from "../controllers/authController.js";

const UserRouter = express.Router();

// insert new user route
UserRouter.post("/register", createNewUser);
export default UserRouter;
