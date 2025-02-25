import responseClient from "../middleware/responseClient.js";
import {
  insertNewUser,
  activateUserAccount,
  getUserbyjwtandemail,
  getUserByEmail,
} from "../models/User/UserModel.js";
import { hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";
import {
  createSession,
  deleteSession,
} from "../models/Session/SessionModel.js";
import {
  emailActivationUrlNotification,
  accountActivatedNotificationEmail,
  otpNotificationEmail,
} from "../services/email/emailSender.js";
// import { joi } from "joi";
import { varifyRefreshJwt, accessJwt } from "../utils/jwt.js";
import { createOtp } from "../utils/createOtp.js";

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
        expire: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000),
      };

      const session = await createSession(sessionObject);
      // 5.create the link with token and session id
      if (session?._id) {
        const url = `${process.env.ROOT_URL}/activate-user?id=${session._id}&t=${session.token}`;

        const obj = { name: user.FName, email: user.email, url };
        const mail = await emailActivationUrlNotification(obj);
        if (mail.messageId) {
          const message =
            " Congratulation's your account is created successfully. we have sent you the activation link to your email.please check your email and follow the instruction to activate your account";
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
    const { t, _id } = req.body;

    const obj = {
      _id,
      token: t,
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
        const payload = "";
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

export const loginUser = async (req, res, next) => {
  return responseClient({
    req,
    res,
    message: "login successfull",
    payload: req.JWT,
  });
};
export const renewAcessJwt = async (req, res, next) => {
  try {
    // data flow to renew accessjwt
    // 1. recieve the token in the req header

    const { authorization } = req.headers;
    if (authorization) {
      // 2. get toen from the req.headers
      const token = authorization.split(" ")[1];
      // 3. validate the refresh jwt
      const isJwtValid = varifyRefreshJwt(token);

      if (isJwtValid) {
        // 4.if token is valid make the database query to make sure token also availble in user table
        const user = await getUserbyjwtandemail({
          email: isJwtValid.email,
          refreshJwt: token,
        });
        // if you recive the user then create new accessjwt and store into session table and response to the client
        if (user?._id) {
          // crete access jwt
          const acessJwtTOKEN = accessJwt(user.email);
          // store token into the databae session table
          const sessionObject = {
            token: acessJwtTOKEN,
            association: user.email,
            expire: new Date(Date.now() + 15 * 60 * 1000),
          };

          const session = await createSession(sessionObject);
          if (session?._id) {
            return responseClient({
              req,
              res,
              message: "here is newacessJwt ",
              payload: session.token,
            });
          }
        }
      }
    }

    responseClient({
      req,
      res,
      message: "no jwt ",
      statusCode: 401,
    });
  } catch (error) {
    next(error);
  }
};

// forgot password
export const getOtp = async (req, res, next) => {
  // data flow

  // get email from client
  try {
    const { email } = req.body;
    console.log(email);

    // check if email exist in db
    const user = await getUserByEmail(email);
    if (user?._id) {
      // create otp
      const otp = createOtp();
      //  save otp in session table
      const sessionObject = {
        token: otp,
        association: user.email,
        expire: new Date(Date.now() + 15 * 60 * 1000),
      };

      const session = await createSession(sessionObject);
      // send email otp to cleint email
      if (session?._id) {
        const obj = { name: user.FName, otp, email: session.association };
        const mail = await otpNotificationEmail(obj);
        if (mail.accepted) {
          return responseClient({
            req,
            res,
            message:
              "We have sent an OTP to your email.Please check your inbox.If you have not received the OTP, kindly check your spam/junk folder.If you still haven’t received it, please request a new OTP",
          });
        }
      }
    }
    
  } catch (error) {
    next(error);
  }
};
