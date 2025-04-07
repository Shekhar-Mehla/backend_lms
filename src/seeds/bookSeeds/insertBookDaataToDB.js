import databaseConncetion from "../../config/db.js";
import { deleteBooks, insertManyBooks } from "../../models/Book/BookModel.js";
import booksData from "./bookseedData.js";

const insertBookDaataToDB = async () => {
  // make db coonection
  try {
    await databaseConncetion();
    await emptDb(booksData);
    insetBookToDb(booksData);
  } catch (error) {
    console.log(error);
  }
};
const emptDb = async (booksData) => {
  const data = await deleteBooks(booksData);
  console.log(data, "16");
};
const insetBookToDb = async (booksData) => {
  await insertManyBooks(booksData);
};
insertBookDaataToDB();
export default insertBookDaataToDB;
