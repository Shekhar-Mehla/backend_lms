import responseClient from "../middleware/responseClient.js";
import { varifyJWT } from "../utils/jwt.js";
import { deleteAllSessions } from "../models/Session/SessionModel.js";
import {
  getAllUsers,
  getUserByEmail,
  updateUser,
} from "../models/User/UserModel.js";
export const getUserProfile = async (req, res, next) => {
  return responseClient({
    req,
    res,
    message: "here is the user",
    payload: req.userInfo,
  });
};
export const getAllUserList = async (req, res, next) => {
  try {
    if (!req.userInfo.role === "admin") {
      return responseClient({
        req,
        res,
        message: "you are not authrozied",
        statusCode: 400,
      });
    }
    const usersList = await getAllUsers(req.userInfo._id);
    if (Array.isArray(usersList)) {
      return responseClient({
        req,
        res,
        message: "all user for admin",
        payload: usersList,
      });
    } else {
      return responseClient({
        req,
        res,
        statusCode: 400,
        message: "something went wrong",
        payload: [],
      });
    }
  } catch (error) {}
};
export const logOutUser = async (req, res, next) => {
  const user = await updateUser({ _id: req.userInfo._id }, { refreshJwt: "" });
  console.log(user);
  if (user?.refreshJwt == "") {
    const session = await deleteAllSessions({ association: user?.email });
    if (session?.deletedCount > 0) {
      return responseClient({ req, res, message: "you have logged out" });
    }
  }
};
