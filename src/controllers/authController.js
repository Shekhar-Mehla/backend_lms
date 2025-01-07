import responseClient from "../middleware/responseClient.js";
import {
  insertNewUser,
  activateUserAccount,
  getUserByEmail,
} from "../models/User/UserModel.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import {
  createSession,
  deleteSession,
} from "../models/Session/SessionModel.js";
import {
  emailActivationUrlNotification,
  accountActivatedNotificationEmail,
} from "../services/email/emailSender.js";
// import { joi } from "joi";

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
      console.log(user);
      const sessionObject = {
        token: uuidv4(),
        association: user.email,
      };

      const session = await createSession(sessionObject);
      // 5.create the link with token and session id
      if (session?._id) {
        const url = `${process.env.ROOT_URL}/activate-user?id=${session._id}&t=${session.token}`;

        const obj = { name: user.FName, email: user.email, url };
        const mail = await emailActivationUrlNotification(obj);
        if (mail.messageId) {
          const message = "user has added successfully";
          return responseClient({ req, res, message });
        }
      }
    }

    // 6. send the link to user email

    const statusCode = 500;
    const message = "internal server error please try again later";

    return responseClient({ req, res, message, statusCode });
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
// 7.when user click on the link which he recieved in email we need to do following process.
// 7.1 recieved the toekn and  id from the front end

export const activateUser = async (req, res, next) => {
  try {
    const { token, _id } = req.body;

    const obj = {
      _id,
      token,
    };
    //7.2 make  database querry and delete the session recored
    const session = await deleteSession(obj);
    // 7.3 if deleted seccussfully we will recieve the deleted object in sesssion and it will have _id
    if (session?._id) {
      // 7.4 get the user email from the object
      const email = session.association;
      // make the database querry and update the user status to active
      const updatedUser = await activateUserAccount(
        { email },
        { status: "active" }
      );
      // if user is update it will return the updated object which will have _id and if _id is recieve then send email gto the user says there account is activated
      if (updatedUser?._id) {
        const url = `${process.env.ROOT_URL}/login`;
        const obj = { name: updatedUser.FName, email: updatedUser.email, url };
        const mail = await accountActivatedNotificationEmail(obj);

        const message = "your acconut is now active";
        const payload = mail;
        return responseClient({ req, res, message, payload });
      }
    }
    const statusCode = 400;
    const message = "your link is invalid";

    return responseClient({ req, res, message, statusCode });
  } catch (error) {
    next(error);
  }
};
// login controller

export const loginUserAuthenticater = async (req, res, next) => {
  try {
    //  1. recieve the user credentials
    const { email, password } = req.body;
    // 2.get the user by email
    const user = await getUserByEmail(email);
    if (user?._id) {
      // 3.get user password from database and compare the password with client password
      const ispasswordValid = comparePassword(password, user.password);
      if(ispasswordValid){
// if ispasswordValid is true the create the refrsh jwt and access jwt and then respond then to the client

const jwts = createJwtsToken()
      return  res.send(ispasswordValid);
      }
      return responseClient({ req, res, message :"invalid credentials",statusCode:401 });
    }
  } catch (error) {next(error)}
};
