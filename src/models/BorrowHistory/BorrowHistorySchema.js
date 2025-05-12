import mongoose from "mongoose";
const borrowSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: Boolean,
    },
    imageUrl: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
const borrowCollection = new mongoose.model("Borrow", borrowSchema);

export default borrowCollection;
