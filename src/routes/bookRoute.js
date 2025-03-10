import express from "express";

import { AdminAuthMidlleware } from "../middleware/authMidlleware/AdminAuthMiddleware.js";
import { NewBookDataValidation } from "../middleware/joiValidation/dataValidation.js";
import { UserAuthMiddleware } from "../middleware/authMidlleware/UserAuthMiddleware.js";
import { upload } from "../utils/multer.js";

const bookRouter = express.Router();
// apply mutler before accesing the req.body to parse data with mutlter and to be accesble in req.body

// insert new user route
bookRouter.post(
  "/add-new-book",
  UserAuthMiddleware,
  AdminAuthMidlleware,
  upload.single("image", (req, res, file, next) => {
    console.log(req.body);
    console.log(req.file);
    console.log("multer");
  }),
  NewBookDataValidation
);

export default bookRouter;
