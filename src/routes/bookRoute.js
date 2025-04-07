import express from "express";

import { AdminAuthMidlleware } from "../middleware/authMidlleware/AdminAuthMiddleware.js";
import {
  deleteBookDataValidation,
  NewBookDataValidation,
  updateBookValidation,
} from "../middleware/joiValidation/dataValidation.js";
import { UserAuthMiddleware } from "../middleware/authMidlleware/UserAuthMiddleware.js";
import { upload } from "../utils/multer.js";
import {
  createNewBook,
  deleteBook,
  getAllBook,
  updateBook,
} from "../controllers/bookController.js";

const bookRouter = express.Router();
// apply mutler before accesing the req.body to parse data with mutlter and to be accesble in req.body

// insert new user route
bookRouter.post(
  "/add-new-book",
  UserAuthMiddleware,
  AdminAuthMidlleware,
  // upload.single("images"),
  upload.array("images", 5),
  NewBookDataValidation,
  createNewBook
);
bookRouter.post(
  "/update-book",
  UserAuthMiddleware,
  AdminAuthMidlleware,
  // upload.single("images"),
  upload.array("images", 5),
  updateBookValidation,
  updateBook
);
bookRouter.delete(
  "/delete-book",
  UserAuthMiddleware,
  AdminAuthMidlleware,
  deleteBookDataValidation,
  deleteBook
);
bookRouter.get("/admin/book-list", getAllBook);

export default bookRouter;
