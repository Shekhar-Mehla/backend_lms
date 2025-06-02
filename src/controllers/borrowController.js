import responseClient from "../middleware/responseClient.js";
import { getBooksbyId } from "../models/Book/BookModel.js";
import {
  createOneBorrow,
  createManyBorrows,
} from "../models/BorrowHistory/BorrowHistoryModel.js";

export const createNewBorrowController = async (req, res, next) => {
  try {
    if (Array.isArray(req.body)) {
      req.body = req.body.map((book) => {
        return { book, userId: req.userInfo };
      });
      // if array use insertmany
      const borrow = await createManyBorrows(req.body);
      console.log(borrow);

      return;
    }
    // fetch book to check if stock is available or not
    const { bookId } = req.body;
    

    req.body.userId = req.userInfo;

    const borrow = await createOneBorrow(req.body);
    console.log(borrow);

    // get single book or array of books
    // {
    //     title: {
    //       type: String,
    //       required: true, // The title of the borrowed book
    //     },
    //     dueDate: {
    //       type: Date,
    //       required: true,
    //       default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    //       // The date by which the book must be returned
    //     },
    //     returnDate: {
    //       type: Date, // The actual date the book was returned
    //     },
    //     userId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "User",
    //       required: true, // Links the borrow record to a specific user
    //     },
    //     bookId: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Book",
    //       required: true, // Links the borrow record to a specific book
    //     },
    //     status: {
    //       type: String,
    //       enum: ["borrowed", "returned", "overdue"], // Descriptive statuses
    //       default: "borrowed", // Default status when a book is borrowed
    //     },
    //     imageUrl: {
    //       type: String,
    //       required: true, // Optional field for the book's image URL
    //     },
    //     isOverdue: {
    //       type: Boolean,
    //       default: false,
    //     },
  } catch (error) {
    console.log("error in borrow controller", error);
    next(error);
  }
};
