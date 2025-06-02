import borrowCollection from "./BorrowHistorySchema.js";
export const createOneBorrow = async (obj) => {
  return await borrowCollection(obj).save();
};
export const createManyBorrows = async (obj) => {
  return await borrowCollection.insertMany(obj);
};
