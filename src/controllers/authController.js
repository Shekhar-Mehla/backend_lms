import responseClient from "../middleware/responseClient.js";
import { insertNewUser } from "../models/User/UserModel.js";

export const createNewUser = async (req, res, next) => {
  try {
    // user registration process
    // 1. recieve the user details from the front end app
    // 2. hash the user password
    // 3. store data into user table
    // 4.create the  token suing UUID package and store into the session table
    // 5.create the link with token and user email
    // 6. send the link to user email

    const user = await insertNewUser(req.body);
    if (user?._id) {
      const message = "user has added successfully";
      return responseClient({ req, res, message });
    }
    throw new Error("hellow throw error");
  } catch (error) {
    next(error)
  }
};
