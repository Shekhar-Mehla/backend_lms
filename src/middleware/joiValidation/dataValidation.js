import Joi from "joi";
import {
  FNAME,
  LNAME,
  EMAIL,
  PASSWORD,
  PHONE,
  TITTLEReq,
  AUTHORReq,
  ISBNREQ,
  IMAGEURLReq,
  IMAGELIST,
  CREATEDBY,
  UPDATEDBY,
  STATUS,
} from "./joiconstatnt.js";
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
export const NewBookDataValidation = (req, res, next) => {
  const obj = {
    title: TITTLEReq,
    author: AUTHORReq,
    isbn: ISBNREQ,
    imageUrl: IMAGEURLReq,
    imageList: IMAGELIST,
    createdBy: CREATEDBY,
    updatedBy: UPDATEDBY,
    status: STATUS,
  };

  return dataValidation({ req, res, obj, next });
};

const dataValidation = ({ req, res, obj, next }) => {
  const schema = Joi.object(obj);
  const { error, value } = schema.validate(req.body);
  if (error) {
    // IF you get error here make sure u delete the image which you just uploaded vin the file
    return responseClient({
      req,
      res,
      statusCode: 403,
      message: error.message,
    });
  }
  next();
};
