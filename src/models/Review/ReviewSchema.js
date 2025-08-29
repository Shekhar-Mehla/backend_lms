// ...existing code...
import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 255,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
  
   status: {
  type: String,
  enum: ['pending', 'approved', 'rejected'],
  default: 'pending',
}
  },
  { timestamps: true }
);

// prevent duplicate reviews by same user for same book
reviewSchema.index({ bookId: 1, userId: 1 }, { unique: true });



const ReviewCollection = mongoose.model("Review", reviewSchema);

export default ReviewCollection;
//