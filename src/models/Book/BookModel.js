import bookCollection from "./BookSchema.js";
export const addNewBook = async (obj) => {
  return await bookCollection(obj).save();
};
export const fetchBooks = async () => {
  return await bookCollection.find();
};
export const getAllPublicBook = async () => {
  return await bookCollection.find({ status: "active" });
};
export const deleteBooks = async () => {
  return await bookCollection.deleteMany();
};
export const deleteOneBook = async (_id) => {
  console.log(_id);
  return await bookCollection.findOneAndDelete({ _id }, { new: true });
};
export const insertManyBooks = async (books) => {
  return await bookCollection.insertMany(books);
};
export const updateBookData = async (filter, update) => {
  return await bookCollection.findOneAndUpdate(filter, update, { new: true });
};
export const getSingleBook = async (filter) => {
  return await bookCollection.findOne(filter);
};
export const getBooksbyId = async (filter) => {
  return await bookCollection.find(filter);
};
