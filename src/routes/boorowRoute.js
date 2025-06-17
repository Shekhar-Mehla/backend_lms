import express from "express";

import { AdminAuthMidlleware } from "../middleware/authMidlleware/AdminAuthMiddleware.js";
// import {
//   deleteBookDataValidation,
//   NewBookDataValidation,
//   updateBookValidation,
// } from "../middleware/joiValidation/dataValidation.js";
import { UserAuthMiddleware } from "../middleware/authMidlleware/UserAuthMiddleware.js";

import { createNewBorrowController } from "../controllers/borrowController.js";
import { borrowDataValidation } from "../middleware/joiValidation/dataValidation.js";

const borrowRouter = express.Router();
// apply mutler before accesing the req.body to parse data with mutlter and to be accesble in req.body
borrowRouter.post(
  "/add-borrow",
  borrowDataValidation,
  UserAuthMiddleware,
  AdminAuthMidlleware,
  createNewBorrowController
);

export default borrowRouter;
