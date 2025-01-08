import jwt from "jsonwebtoken";
// create accessJwt
const accessJwt = (email) => {
  const token = jwt.sign({ email }, process.env.ACCESS_SECRETKEY, {
    expiresIn: "1d",
  });
  return token;
};
const refreshJwt = (email) => {
  const token = jwt.sign({ email }, process.env.REFRESH_SECRETKEY, {
    expiresIn: "30d",
  });
  return token;
};
export const jwts = async (email) => {
  return {
    accessJwt: await accessJwt(email),
    refreshJwt: await refreshJwt(email),
  };
};
