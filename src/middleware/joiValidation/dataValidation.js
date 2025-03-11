import Joi from "joi";
import slugify from "slugify";
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
  SLUGREQ,
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
  // creat slug and add other property
  console.log(req.files);
  console.log(req.body);
  const slug = "/" + slugify(req.body.title);

  const createdBy = req.userInfo._id;
  req.body = { ...req.body, slug, createdBy };

  const obj = {
    title: TITTLEReq,
    author: AUTHORReq,
    isbn: ISBNREQ,
    imageUrl: IMAGEURLReq,
    imageList: IMAGELIST.allow(null),
    createdBy: CREATEDBY,

    status: STATUS,
    slug: SLUGREQ,
  };

  return dataValidation({ req, res, obj, next });
};

const dataValidation = ({ req, res, obj, next }) => {
  console.log(req.body);
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
