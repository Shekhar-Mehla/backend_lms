import nodemailer from "nodemailer";

export const emailTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT_Email,

    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
};
