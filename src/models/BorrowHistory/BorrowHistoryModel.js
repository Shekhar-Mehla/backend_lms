import borrowCollection from "./BorrowHistorySchema.js";
export const createBoorrow = async (obj) => {
  return await borrowCollection(obj).save();
};
