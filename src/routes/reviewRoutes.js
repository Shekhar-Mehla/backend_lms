import express from "express";
import { addReview } from "../controllers/reviewController.js";
import { UserAuthMiddleware } from "../middleware/authMidlleware/UserAuthMiddleware.js";
export const reviewRouter = express.Router();

reviewRouter.post("/createReview", UserAuthMiddleware, addReview);
