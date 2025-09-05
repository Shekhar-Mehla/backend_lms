import borrowCollection from "./BorrowHistorySchema.js";
export const createOneBorrow = async (obj) => {
  return await borrowCollection(obj).save();
};
export const createManyBorrows = async (obj) => {
  return await borrowCollection.insertMany(obj);
};

//  Check if user already borrowed this book and not returned
export const CheckBorrowedBook = async (userId, bookId) => {
  return await borrowCollection.findOne({
    userId,
    bookId,
    status: "borrowed", // still active
    returnDate: null,   // not yet returned
  });
};
export const getBorrowHistoryWithUserId = async(userId)=>{
  return await borrowCollection
      .find({ userId })
      .populate("bookId", "title")
      .sort({ createdAt: -1 });}


