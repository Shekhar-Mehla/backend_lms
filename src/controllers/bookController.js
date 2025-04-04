import responseClient from "../middleware/responseClient.js";
import {
  addNewBook,
  fetchBooks,
  updateBookData,
} from "../models/Book/BookModel.js";
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
export const getAllBook = async (req, res, next) => {
  try {
    const books = await fetchBooks();

    responseClient({ req, res, payload: books });
  } catch (error) {
    next(error);
  }
};
export const updateBook = async (req, res, next) => {
  try {
    if (req.files.length && Array.isArray(req.files)) {
      const newImagesList = req.files.map((file) => file.path);
      req.body.imageList = [...req.body.imageList, ...newImagesList];
    }

    const { _id, ...rest } = req.body;
    //update db

    const filter = { _id };
    const update = { $set: { ...rest } };
    const book = await updateBookData(filter, update);
    if (book?._id) {
      return responseClient({
        req,
        res,
        message: "book has been updated suceessfully",
      });
    }

    return responseClient({
      req,
      res,
      statusCode: 400,
      message: "could not update the book please try again later",
    });
  } catch (error) {
    deleteFile(req.files);
    next(error);
  }
};
