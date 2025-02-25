import Joi from "joi";
import { FNAME, LNAME, EMAIL, PASSWORD, PHONE } from "./joiconstatnt.js";
import responseClient from "../responseClient.js";
export const NewUserDataValidation = (req, res, next) => {
  const obj = {
    FName: FNAME,
    LName: LNAME,
    phone: PHONE,
    email: EMAIL,
    password: PASSWORD,
    confirmpassword: PASSWORD,
  };

  return dataValidation({ req, res, obj, next });
};

const dataValidation = ({ req, res, obj, next }) => {
  const schema = Joi.object(obj);
  const { error, value } = schema.validate(req.body);
  if (error) {
    console.log(error.message);
    return responseClient({
      req,
      res,
      statusCode: 403,
      message: error.message,
    });
  }
  next();
};
