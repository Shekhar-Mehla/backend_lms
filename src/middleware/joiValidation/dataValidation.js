import Joi from "joi";
import { FNAME, LNAME, EMAIL, PASSWORD, PHONE } from "./joiconstatnt.js";

export const NewUserDataValidation = (req, res, next) => {
  const obj = {
    FName: FNAME,
    LName: LNAME,
    phone: PHONE,
    email: EMAIL,
    password: PASSWORD,
  };

  return dataValidation({ req, res, obj, next });
};

const dataValidation = ({ req, res, obj, next }) => {
  const schema = Joi.object(obj);
  const { error, value } = schema.validate(req.body);
  console.log(error);
  res.json({
    error,
    value,
  });
};
