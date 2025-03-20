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
    publishedDate: {
      type: Date,
      required: true,
    },
    smallDescription: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      unique: true,
    },
    imageList: {
      type: [String], 
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    stockQuantity: {
      
      type: Number,
      required: true,
      default: 0, 
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
