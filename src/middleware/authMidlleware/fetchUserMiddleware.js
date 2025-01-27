import responseClient from "../responseClient.js";
import { varifyJWT } from "../../utils/jwt.js";
import { getsession } from "../../models/Session/SessionModel.js";
import { getUserByEmail } from "../../models/User/UserModel.js";
export const fetchUserMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    let message = "Unathorized";
    if (authorization) {
      const token = authorization.split(" ")[1];

      // workflow

      // 1. check if token is valid on not
      const decodedJwt = await varifyJWT(token);

      if (decodedJwt?.email) {
        // 2. if valid check token is in session table or not

        const session = await getsession(token);
      

        if (session?._id) {
          // 3.if we get token from session table then fetch user and response to the client

          const user = await getUserByEmail(session.association);
          if (user?._id && user.status == "active") {
            user.password = undefined;
            user.__v = undefined;
            user.role = undefined;
            req.userInfo = user;
            return next();
          }
        }
      }

      message =
        decodedJwt.message == "jwt expired"
          ? decodedJwt.message
          : "unathorized";
      return responseClient({ req, res, statusCode: 401, message });
    }
  } catch (error) {
    next(error);
  }
};
