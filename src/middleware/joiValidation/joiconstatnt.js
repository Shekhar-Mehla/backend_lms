import Joi from "joi";

export const FNAME = Joi.string().min(3).max(30).required();
export const LNAME = Joi.string().min(3).max(30).required();
export const PHONE = Joi.number().min(8).required();
export const EMAIL = Joi.string()
  .email({ minDomainSegments: 2 })
  .min(6)
  .required();
export const PASSWORD = Joi.string().min(3).max(30).required();
