import UserCollection from "./UserSchema.js";

// Insert new user
export const insertNewUser = async (obj) => await UserCollection(obj).save();
