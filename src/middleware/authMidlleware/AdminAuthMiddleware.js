import responseClient from "../responseClient.js";

export const AdminAuthMidlleware = (req, res, next) => {
  try {
    if (req.userInfo.role === "admin") {
      return next();
    }
    responseClient({
      req,
      res,
      message: "you are unauthrized",
      statusCode: 401,
    });
  } catch (error) {
    console.log("admin middles has error");
    next(error);
  }
};
