import responseClient from "./responseClient.js";

const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  return responseClient({ req, res, statusCode, message });
};

export default errorMiddleware;
