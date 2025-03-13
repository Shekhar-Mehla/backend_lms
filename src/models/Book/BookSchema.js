import mongoose from "mongoose";
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "inActive",
    },
    slug: { type: String, required: true, unique: true, index: true },
    author: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    imageUrl: {
      type: String,
      required: true,
      unique: true,
    },
    imageList: {
      type: [String], // Array of strings to store multiple image URLs
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, // Assuming this references the user's ID
      ref: "User", // Assuming you have a User model to reference
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId, // Assuming this references the user's ID
      ref: "User", // Assuming you have a User model to reference
      required: false,
    },
  },
  { timestamps: true }
);
const bookCollection = new mongoose.model("Book", bookSchema);

export default bookCollection;
