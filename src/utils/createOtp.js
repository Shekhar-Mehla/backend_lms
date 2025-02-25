export const createOtp = () => {
  const otp = [];
  for (let index = 0; index < 4; index++) {
    const num = Math.floor(Math.random() * 9) + 1;
    otp.push(num);
  }
  return otp.join("");
};
