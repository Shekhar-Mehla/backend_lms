import Joi from "joi";

export const FNAME = Joi.string().min(3).max(30).required();
export const LNAME = Joi.string().min(3).max(30).required();
export const PHONE = Joi.number().min(8).required();
export const EMAIL = Joi.string()
  .email({ minDomainSegments: 2 })
  .min(6)
  .required();
export const PASSWORD = Joi.string().min(3).max(30).required();

export const TITTLE = Joi.string().min(3).max(200);
export const TITTLEReq = TITTLE.required();
export const AUTHOR = Joi.string().min(3).max(100);
export const AUTHORReq = AUTHOR.required();
export const ISBN = Joi.string()
  .pattern(/^[0-9]+$/) // Ensure the string only contains numbers
  .length(10); // First condition: length 10
// .alternatives()
// .try(
//   Joi.string()
//     .pattern(/^[0-9]+$/)
//     .length(13) // Second condition: length 13
// );

export const ISBNREQ = ISBN.required();
export const IMAGEURLReq = Joi.string().min(3).max(200).required();
export const IMAGELIST = Joi.array().items(Joi.string());
export const IMAGELISTREQ = IMAGELIST.required();
export const CREATEDBY = Joi.object().required();
export const UPDATEDBY = Joi.string().min(3).max(30).required();
export const STATUS = Joi.string().valid("active", "inActive");
export const SLUG = Joi.string().min(4).max(200);
export const SLUGREQ = SLUG.required();
export const GENREREQ = Joi.string().min(4).max(50).required();
export const DESCRIPTION = Joi.string().min(10).max(10000);
export const DESCRIPTION_REQ = DESCRIPTION.required();
export const SMALL_DESCRIPTION = Joi.string().min(10).max(10000);
export const SMALL_DESCRIPTION_REQ = SMALL_DESCRIPTION.required();
export const PUBLISH_DATE = Joi.date();
export const PUBLISH_DATE_REQ = PUBLISH_DATE.required();
export const STOCK_QUANTITY = Joi.number().min(1);
export const STOCK_QUANTITY_REQ = STOCK_QUANTITY.required();
export const ID_REQ = Joi.string().required();
export const IMAGETODELETE = Joi.array().items(Joi.string());
