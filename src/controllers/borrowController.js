import responseClient from "../middleware/responseClient.js";
import { getBooksbyId } from "../models/Book/BookModel.js";
import {
  CheckBorrowedBook,
  createManyBorrows,
  getBorrowHistoryWithUserId,
} from "../models/BorrowHistory/BorrowHistoryModel.js";
import checkStockAvailability from "../utils/checkStockAvailability.js";
import updateBookStock from "../utils/updateBookStock.js";

export const createNewBorrowController = async (req, res, next) => {
  try {
    // Ensure req.body is always an array
    if (!Array.isArray(req.body)) {
      req.body = [req.body];
    }

    // Add required fields
    req.body = req.body.map((book) => ({
      ...book,

      userId: req.userInfo._id,
      quantity: 1,
    }));

    // Separate blocked (already borrowed) and allowed
    const blocked = [];
    const allowed = [];

    for (const book of req.body) {
      const existingBorrow = await CheckBorrowedBook(
        req.userInfo._id,
        book.bookId
      );

      if (existingBorrow) {
        blocked.push({
          bookId: book.bookId,
          title: book.title,
          message:
            "You already borrowed this book and must return it before borrowing again.",
        });
      } else {
        allowed.push(book);
      }
    }

    // If nothing allowed, exit early
    if (allowed.length === 0) {
      return responseClient({
        req,
        res,
        statusCode: 400,
        message:
          "No books could be borrowed because You already borrowed this book and must return it before borrowing again.",
        payload: { blocked },
      });
    }

    // Check stock for allowed books
    const stock = await checkStockAvailability(allowed);
    if (!stock) {
      return responseClient({
        req,
        res,
        statusCode: 400,
        message: "Insufficient stock for one or more books.",
      });
    }

    // Create borrow records
    const borrow = await createManyBorrows(allowed);

    if (borrow.length && Array.isArray(borrow)) {
      // Update stock
      const updatedBook = await updateBookStock(borrow);
      if (!updatedBook.modifiedCount >= 1) {
        return responseClient({
          req,
          res,
          statusCode: 401,
          message: "Could not update the stock",
        });
      }

      return responseClient({
        req,
        res,
        message:
          "Borrow successful. You must return your books within 15 days.",
        payload: { borrowed: borrow, blocked },
      });
    }
  } catch (error) {
    next(error);
  }
};

// controllers/borrowHistoryController.js

export const getBorrowHistoryController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Fetch borrow history
    const history = await getBorrowHistoryWithUserId(userId);

    const today = new Date();

    const formattedHistory = await Promise.all(
      history.map(async (item) => {
        const isOverdue = item.status === "borrowed" && item.dueDate < today;

        if (isOverdue && !item.isOverdue) {
          item.isOverdue = true;
          item.status = "overdue";
          await item.save().catch(console.error);
        }

        return {
          book: item.title || item.bookId?.title || "Unknown",
          borrowedDate: item.createdAt.toISOString().split("T")[0],
          dueDate: item.dueDate.toISOString().split("T")[0],
          status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
        };
      })
    );

    // Always return success, even if empty
    return responseClient({
      req,
      res,
      statusCode: 200,
      message: "Borrow history fetched successfully",
      payload: { borrowed: formattedHistory },
    });
  } catch (error) {
    next(error);
  }
};
