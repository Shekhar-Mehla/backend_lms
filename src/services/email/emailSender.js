import { emailTransporter } from "./emailTransporter.js";
import {
  urlTemplate,
  accountActivationTemplate,
  otpTemplate,
} from "./emailTemplate.js";

export const emailActivationUrlNotification = async (obj) => {
  return await emailTransporter().sendMail(urlTemplate(obj));
};
export const accountActivatedNotificationEmail = async (obj) => {
  return await emailTransporter().sendMail(accountActivationTemplate(obj));
};
export const otpNotificationEmail = async (obj) => {
  return await emailTransporter().sendMail(otpTemplate(obj));
};
