import responseClient from "../middleware/responseClient.js";
import { varifyJWT } from "../utils/jwt.js";
import { getsession } from "../models/Session/SessionModel.js";
import { getUserByEmail } from "../models/User/UserModel.js";
export const getUserProfile = async (req, res, next) => {
  return responseClient({req,res,message:"here is the user",payload: req.userInfo})
};
