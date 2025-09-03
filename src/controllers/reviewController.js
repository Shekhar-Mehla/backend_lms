import { addNewReview } from "../models/Review/ReviewModel.js";
import responseClient from "../middleware/responseClient.js";

// Add a new review
export const addReview = async (req, res, next) => {
  try {
    const { bookId, rating, comment, userId } = req.body;

    // Basic validation
    if (!bookId || !userId || !rating) {
      return responseClient({
        res,
        res,
        statusCode: 400,
        message: "bookId, userId, and rating are required.",
      });
    }

    // Save review
    const review = await addNewReview(req.body);

    if (review?._id) {
      return responseClient({
        res,
        req,
        statusCode: 201,
        message: "Review added successfully",
      });
    }

    return responseClient({
      res,
      req,
      statusCode: 400,
      message: "Something went wrong while saving review",
    });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate review error

      error.message =
        "You have already submitted a review for this book. Only one review is allowed per book.";
    }
    next(error);
  }
};
