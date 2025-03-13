import bookCollection from "./BookSchema.js";
export const addNewBook = async (obj) => {
  return await bookCollection(obj).save();
};
