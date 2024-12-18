import responseClient from "../middleware/responseClient.js";
import { insertNewUser } from "../models/User/UserModel.js";
import { hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import { SessionCollection } from "../models/Session/SessionModel.js";

export const createNewUser = async (req, res, next) => {
  try {
    // user registration process
    // 1. recieve the user details from the front end app
    // 2. hash the user password
    const { password } = req.body;
    req.body.password = hashPassword(password);

    // 3. store data into user table
    const user = await insertNewUser(req.body);
    if (user?._id) {
      // 4.create the  token suing UUID package and store into the session table

      const sessionObject = {
        token: uuidv4(),
        association: user.email,
      };

      const session = await SessionCollection(sessionObject);
      // 5.create the link with token and user email
      if(session?._id){
        const url = `http://localhost:5173/activate?id = ${session._id}&t = ${session.token}`


        
      }
      const message = "user has added successfully";
      return responseClient({ req, res, message });
    }

    // 6. send the link to user email

    throw new Error("hellow throw error");
  } catch (error) {
    if (
      error.message.includes(
        "E11000 duplicate key error collection: LMS.users index: email_1 dup key"
      )
    ) {
      error.message =
        "Email address you have provied is already associated with other user.Reset your password or use another email address";
      error.statusCode = 400;
    }
    next(error);
  }
};
