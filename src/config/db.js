import mongoose from "mongoose";

const databaseConncetion = async () => {
  try {
    return mongoose.connect(import.meta.env.VITE_Mongo_URL);
  } catch (error) {
    return error;
  }
};

export default databaseConncetion;
