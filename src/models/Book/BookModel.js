import bookCollection from "./BookSchema.js";
export const addNewBook = async (obj) => {
  return await bookCollection(obj).save();
};
export const fetchBooks = async () => {
  return await bookCollection.find();
};
export const deleteBooks = async () => {
  return await bookCollection.deleteMany({});
};
export const insertManyBooks = async (books) => {
  return await bookCollection.insertMany(books);
};
export const updateBookData = async (filter, update) => {
  return await bookCollection.findOneAndUpdate(filter, update, { new: true });
};
