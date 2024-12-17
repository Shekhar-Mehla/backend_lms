import nodemailer from "nodemailer";
import { emailTransporter } from "./emailTransporter.js";
import React from "react";

export const emailSender = async () => {
  const info = await transporter.sendMail({
    from: '"Shekhar" <smehla147@gmail.com>', // sender address
    to: `${user.email}`, // list of receivers
    subject: "", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
};
