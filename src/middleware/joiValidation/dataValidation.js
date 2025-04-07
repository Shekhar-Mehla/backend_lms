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
  console.log(name, "50");
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
  req.body.imageList = imageList.split(",");
  if (req.body?.imageToDelete) {
    req.body.imageToDelete = req.body.imageToDelete.split(",");
  }

  const obj = {
    title: TITTLEReq,
    author: AUTHORReq,

    imageUrl: IMAGEURLReq,
    imageList: IMAGELISTREQ,
    imageToDelete: IMAGETODELETE,

    genre: GENREREQ,

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
