import { getUserByEmail, updateUser } from "../../models/User/UserModel.js";
import { comparePassword } from "../../utils/bcrypt.js";
import { jwts } from "../../utils/jwt.js";
import { createSession } from "../../models/Session/SessionModel.js";
import responseClient from "../responseClient.js";
export const loginUserMiddleWare = async (req, res, next) => {
  try {
    //  1. recieve the user credentials
    const { email, password } = req.body;
    // 2.get the user by email
    const user = await getUserByEmail(email);
    if (user?._id) {
      // 3.get user password from database and compare the password with client password
      const ispasswordValid = comparePassword(password, user.password);
      if (ispasswordValid) {
        // if ispasswordValid is true the create the refrsh jwt and access jwt and store the token into database and also response the client

        const jwt = await jwts(user.email);

        if (jwt.accessJwt && jwt.refreshJwt) {
          // update user and add refresh jwt in user and accessjwt in session table
          const newUser = await updateUser(
            { email: user.email },
            { refreshJwt: jwt.refreshJwt }
          );

          if (newUser?._id) {
            const sessionObject = {
              token: jwt.accessJwt,
              association: user.email,
            };

            const session = await createSession(sessionObject);
            if (session?._id) {
              req.JWT = jwt;
              return next();
            }
          }
        }
      }
      return responseClient({
        req,
        res,
        message: "invalid login details",
        statusCode: 401,
      });
    }
    throw new Error("invalid login details");
  } catch (error) {
    next(error);
  }
};
