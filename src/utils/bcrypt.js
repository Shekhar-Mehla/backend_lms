import bcrypt from "bcrypt";
export const hashPassword = (passowrd) => {
  const saltRounds = 15;
  return bcrypt.hashSync(passowrd, saltRounds);
};

export const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
