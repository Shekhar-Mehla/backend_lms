import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    FName: { type: String, require: true },
    LName: { type: String, require: true },
    phone: { type: String },
    password: { type: String, require: true },
    email: { type: String, require: true, unique: true, index: 1 },
    role: { type: String, default: "user" },
    status: { type: String, default: "inActive" },
    refreshJwt: {
      type: String,
    },
  },
  { timestamps: true }
);
const UserCollection = new mongoose.model("User", UserSchema);

export default UserCollection;
