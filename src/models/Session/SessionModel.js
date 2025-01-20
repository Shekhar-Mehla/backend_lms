import SessionShema from "./SessionShema.js";

// insert new data into session collection

export const createSession = async (obj) => {
  return await SessionShema(obj).save();
};
export const deleteSession = async (obj) => {
  return await SessionShema.findOneAndDelete(obj);
};
export const getsession = async (filter) => {
  return await SessionShema.findOne({ token: filter });
};
