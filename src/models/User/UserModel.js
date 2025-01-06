import UserCollection from "./UserSchema.js";

// Insert new user
export const insertNewUser = async (obj) => await UserCollection(obj).save();
export const activateUserAccount = async (filter,update) =>
  await UserCollection.findOneAndUpdate(
    filter,
    update,
    { new: true }
  );
