import jwt from "jsonwebtoken";
// create accessJwt
const accessJwt = (email) => {
  const token = jwt.sign({ email }, process.env.ACCESS_SECRETKEY, {
    expiresIn: "15m",
  });
  return token;
};
const refreshJwt = (email) => {
  const token = jwt.sign({ email }, process.env.REFRESH_SECRETKEY, {
    expiresIn: "30d",
  });

  return token;
};
export const jwts = (email) => {
  return {
    accessJwt: accessJwt(email),
    refreshJwt: refreshJwt(email),
  };
};

export const varifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRETKEY);
    return decoded;
  } catch (error) {
    console.log(error);
  }
};
