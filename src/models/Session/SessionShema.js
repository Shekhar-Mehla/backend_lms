import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      require: true,
    },
    association: { type: String, require: true },
    expire: {
      require: true,
      type: Date,
      default: new Date(Date.now() + 24 * 60 * 60 * 1000),
      expires: 0,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Session", sessionSchema);
