import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // The title of the borrowed book
    },
    dueDate: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      // The date by which the book must be returned
    },
    returnDate: {
      type: Date, // The actual date the book was returned
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Links the borrow record to a specific user
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true, // Links the borrow record to a specific book
    },
    status: {
      type: String,
      enum: ["borrowed", "returned", "overdue"], // Descriptive statuses
      default: "borrowed", // Default status when a book is borrowed
    },
    imageUrl: {
      type: String,
      required: true, // Optional field for the book's image URL
    },
    isOverdue: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const borrowCollection = mongoose.model("Borrow", borrowSchema);

export default borrowCollection;
