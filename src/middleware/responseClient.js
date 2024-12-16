const responseClient = ({ req, res, statusCode = 200, message }) => {
  req.success = () => {
    return res.status(statusCode).json({
      status: "success",
      message,
    });
  };
  req.error = () => {
    return res.status(statusCode).json({
      status: "error",
      message,
    });
  };

  if (statusCode >= 200 && statusCode < 300) {
    return req.success();
  } else {
    req.error();
  }
};

export default responseClient;
