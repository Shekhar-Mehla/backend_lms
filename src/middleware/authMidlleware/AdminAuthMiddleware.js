export const AdminAuthMidlleware = (req, res, next) => {
  try {
    if (req.userInfo.role === "admin") {
      console.log("admin code runs then went to next validator")
      return next();
    }
    responseClient({
      req,
      res,
      message: "you are unauthrized",
      statusCode: 401,
    });
  } catch (error) {
    next(error);
  }
};
