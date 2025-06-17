import responseClient from "../middleware/responseClient.js";
import { getBooksbyId } from "../models/Book/BookModel.js";
import {
  createOneBorrow,
  createManyBorrows,
} from "../models/BorrowHistory/BorrowHistoryModel.js";
import checkStockAvailability from "../utils/checkStockAvailability.js";
import updateBookStock from "../utils/updateBookStock.js";

export const createNewBorrowController = async (req, res, next) => {
  try {
    console.log(req.body, ".....");

    const today = new Date();
    const dueDate = new Date(today); // Create a copy of today's date
    dueDate.setDate(today.getDate() + 15); // Add 15 days to the dueDate
    req.body = req.body.map((book) => {
      return {
        ...book,
        dueDate,
        userId: req.userInfo._id,
        quantity: 1,
      };
    });
    const stock = await checkStockAvailability(req.body);
    if (stock) {
      const borrow = await createManyBorrows(req.body);
      if (borrow.length && Array.isArray(borrow)) {
        // update stock
        const updatedBook = await updateBookStock(borrow);
        if (!updatedBook.modifiedCount >= 1) {
          return responseClient({
            req,
            res,
            statusCode: 401,
            message: "could not update the stock",
          });
        }
        return responseClient({
          req,
          res,
          message: "updated stock succefully",
        });
      }
    }
    //
  } catch (error) {
    next(error);
  }
};
