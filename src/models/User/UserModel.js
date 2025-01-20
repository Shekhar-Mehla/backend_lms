import UserCollection from "./UserSchema.js";

// Insert new user
export const insertNewUser = async (obj) => await UserCollection(obj).save();
// activate user
export const activateUserAccount = async (filter, update) =>
  await UserCollection.findOneAndUpdate(filter, update, { new: true });

// get user by email
export const getUserByEmail = async (email) =>
  await UserCollection.findOne({ email });

// update user
export const updateUser = async (filter, update) => {
  console.log(filter, update);
  return await UserCollection.findOneAndUpdate(filter, update, { new: true });
};
