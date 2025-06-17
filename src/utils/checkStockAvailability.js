import { getBooksbyId } from "../models/Book/BookModel.js";

const checkStockAvailability = async (orderBooks) => {
  for (const singleBook of orderBooks) {
    const book = await getBooksbyId({ _id: singleBook.bookId });
    if (!book._id) {
      throw new Error("book is not found");
    }
    if (book.stockQuantity < singleBook.quantity) {
      throw new Error(`${book.title} is currently not available`);
    }
  }
  return true;
};

export default checkStockAvailability;
