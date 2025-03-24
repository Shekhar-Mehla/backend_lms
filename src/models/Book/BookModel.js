import bookCollection from "./BookSchema.js";
export const addNewBook = async (obj) => {
  return await bookCollection(obj).save();
};
export const fetchBooks = async () => {
  return await bookCollection.find();
};
