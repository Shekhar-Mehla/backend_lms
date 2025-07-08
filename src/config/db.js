import mongoose from "mongoose";

const databaseConncetion = async () => {
  try {
    return mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    return error;
  }
};

export default databaseConncetion;
