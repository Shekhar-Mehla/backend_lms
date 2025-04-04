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
  
  CREATEDBY,
  
  STATUS,
  SLUGREQ,
  GENREREQ,
  IMAGELISTREQ,
} from "./joiconstatnt.js";
import responseClient from "../responseClient.js";
import deleteFile from "../../utils/deleteFile.js";
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
  let imageList = [];

  const slug = "/" + slugify(req.body.title);

  if (req.files && Array.isArray(req.files)) {
    imageList = req.files.map((img) => {
      return img.path;
    });
  }
  const imageUrl = imageList[0];

  const createdBy = req.userInfo?._id;
  req.body = { ...req.body, imageUrl, slug, createdBy, imageList };

 

  const obj = {
    title: TITTLEReq,
    author: AUTHORReq,
    isbn: ISBNREQ,
    imageUrl: IMAGEURLReq,
    imageList: IMAGELISTREQ,
    createdBy: CREATEDBY,
    genre: GENREREQ,

    status: STATUS,
    slug: SLUGREQ,
  };

  return dataValidation({ req, res, obj, next });
};

const dataValidation = ({ req, res, obj, next }) => {
  const schema = Joi.object(obj);
  const { error, value } = schema.validate(req.body);
  if (error) {
    // IF you get error here make sure u delete the image which you just uploaded in the file
    deleteFile(req.files);
    return responseClient({
      req,
      res,
      statusCode: 403,
      message: error.message,
    });
  }
  return next();
};
