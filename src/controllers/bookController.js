import responseClient from "../middleware/responseClient.js";
import { addNewBook } from "../models/Book/BookModel.js";
import deleteFile from "../utils/deleteFile.js";

// add new book
export const createNewBook = async (req, res, next) => {
  try {
    // get book in req.body and files in req.files(setup multer first to get files smoothley)
    const newBook = await addNewBook(req.body);
    if (newBook?._id) {
      return responseClient({
        req,
        res,
        message: "Book has added successfully",
      });
    }
  } catch (error) {
    deleteFile(req.files);

    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = `duplcate is not allowed for ${JSON.stringify(
        error.keyValue
      )}`;
      error.statusCode = 400;
    }
    next(error);
  }
};
