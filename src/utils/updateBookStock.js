import { updateBulkData } from "../models/Book/BookModel.js";

const updateBookStock = async (borrowedBooks) => {
  const bulkupdate = borrowedBooks.map((book) => {
    return {
      updateOne: {
        filter: { _id: book.bookId },
        update: { $inc: { stockQuantity: -book.quantity } },
      },
    };
  });
  return await updateBulkData(bulkupdate);
};

export default updateBookStock;
