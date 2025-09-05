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
  PUBLISH_DATE_REQ,
  SMALL_DESCRIPTION_REQ,
  DESCRIPTION_REQ,
  STOCK_QUANTITY_REQ,
  ID_REQ,
  IMAGETODELETE,
  CAROUSEL,
  LARGESTRING,
  DUEDATE,
  ID,
  BORROW_STATUS,
  IMGAEURL,
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
  const name = req.userInfo.FName + " " + req.userInfo.LName;

  const createdBy = {
    name,
    adminId: req.userInfo?._id,
  };
  req.body = { ...req.body, imageUrl, slug, createdBy, imageList };

  const obj = {
    title: TITTLEReq,
    author: AUTHORReq,
    isbn: ISBNREQ,
    imageUrl: IMAGEURLReq,
    imageList: IMAGELISTREQ,
    createdBy: CREATEDBY,
    genre: GENREREQ,
    Carousel: CAROUSEL,

    publishedDate: PUBLISH_DATE_REQ,
    smallDescription: SMALL_DESCRIPTION_REQ,
    description: DESCRIPTION_REQ,
    status: STATUS.allow(""),
    slug: SLUGREQ,
    stockQuantity: STOCK_QUANTITY_REQ,
  };

  return dataValidation({ req, res, obj, next });
};
export const updateBookValidation = (req, res, next) => {
  const { imageList } = req.body;
  req.body.imageList = imageList?.split(",");
  if (req.body?.imageToDelete) {
    req.body.imageToDelete = req.body?.imageToDelete?.split(",");
  }

  const obj = {
    title: TITTLEReq,
    author: AUTHORReq,

    imageUrl: IMAGEURLReq,
    imageList: IMAGELISTREQ,
    imageToDelete: IMAGETODELETE,

    genre: GENREREQ,
    Carousel: CAROUSEL,

    publishedDate: PUBLISH_DATE_REQ,
    smallDescription: SMALL_DESCRIPTION_REQ,
    description: DESCRIPTION_REQ,
    status: STATUS.allow(""),
    _id: ID_REQ,
    stockQuantity: STOCK_QUANTITY_REQ,
  };

  return dataValidation({ req, res, obj, next });
};
export const deleteBookDataValidation = (req, res, next) => {
  const obj = {
    _id: Joi.string().required(),
  };

  return dataValidation({ req, res, obj, next });
};
export const borrowDataValidation = (req, res, next) => {
  console.log("hello borrow validation 121");
  const obj = {
    title: LARGESTRING,

    bookId: ID, // Validates MongoDB ObjectId for bookId
    // Validates status with allowed values
    thumbnail: IMGAEURL, // Optional field for a valid URL
  };

  return dataValidation({ req, res, obj, next });
};
// validations/borrowHistoryValidation.js

export const borrowHistoryValidation = (req, res, next) => {
  console.log("Validating borrow history request...");
  console.log(req.params);

  const obj = {
    userId: ID_REQ, // Validate MongoDB ObjectId
  };

  return dataValidation({ req, res, obj, next });
};

export const dataValidation = ({ req, res, obj, next }) => {
  // Determine target to validate: prefer req.body, fallback to req.params
  const target = Object.keys(req.body || {}).length ? req.body : req.params;

  // Determine schema: array for POST body, object for params or single object body
  const schema = Array.isArray(target)
    ? Joi.array().items(obj)
    : Joi.object(obj);

  const { error, value } = schema.validate(target);

  if (error) {
    // If you just uploaded files, delete them
    if (req.files) {
      deleteFile(req.files);
    }

    return responseClient({
      req,
      res,
      statusCode: 403,
      message: error.message,
    });
  }

  // validation passed
  return next();
};
