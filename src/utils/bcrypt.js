import bcrypt from "bcrypt";
export const hashPassword = (passowrd) => {
  const saltRounds = 15;
  return bcrypt.hashSync(passowrd, saltRounds);
};
