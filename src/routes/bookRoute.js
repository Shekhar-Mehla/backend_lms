import express from "express";

import { AdminAuthMidlleware } from "../middleware/authMidlleware/AdminAuthMiddleware.js";
import { NewBookDataValidation } from "../middleware/joiValidation/dataValidation.js";
import { UserAuthMiddleware } from "../middleware/authMidlleware/UserAuthMiddleware.js";

const bookRouter = express.Router();




// insert new user route
bookRouter.post(
  "/add-new-book",
  UserAuthMiddleware,
  AdminAuthMidlleware,
  // NewBookDataValidation
);

export default bookRouter;
