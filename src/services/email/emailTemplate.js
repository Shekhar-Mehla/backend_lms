export const urlTemplate = ({ name, url, email }) => {
  return {
    from: `"Local Library " <${process.env.EMAIL}>`, // sender address
    to: `${email}`, // list of receivers
    subject: "Action-required click on the link to activate the account", // Subject line
    text: `Hello ${name}`, // plain text body
    html: `<span>Hello </span>
<strong>${name},</strong>
<br/>
<br/>

<p>please click on the button below to activate your account</p>
<br/>

<a href = ${url}>
<button style="background-color:green; color:white; font-size:20px; font-weight:500; padding:4px; border:none;border-radius:5px;">Activate Now</button>
</a>
<br/>
<br/>

<p>Best regards</p>
<br></br>
<br></br>
<p>Library management</p>`, // html body
  };
};
export const accountActivationTemplate = ({ name, url, email }) => {
  return {
    from: `"Local Library " <${process.env.EMAIL}>`, // sender address
    to: `${email}`, // list of receivers
    subject: "Account-Activated", // Subject line
    text: `Hello ${name}`, // plain text body
    html: `<span>Hello </span>
<strong>${name},</strong>
<br/>
<br/>
<div >Congratulations! </div>
<br/>
<br/>

<p> Your account is now active. You can now log in using your credentials.

</p>
<br/>

<a href = ${url}>
<button style="background-color:green; color:white; font-size:20px; font-weight:500; padding:4px; border:none;border-radius:5px;">Login Now</button>
</a>
<br/>
<br/>

<p>Best regards</p>
<br></br>
<br></br>
<p>Library management</p>`, // html body
  };
};
export const otpTemplate = ({ name, otp, email }) => {
  return {
    from: `"Local Library" <${process.env.EMAIL}>`, // sender address
    to: `${email}`, // recipient address
    subject: "Your OTP for Account Verification", // Subject line
    text: `Hello ${name},`, // plain text body
    html: `
      <span>Hello </span>
      <strong>${name},</strong>
      <br/>
      <br/>
    
      <div>Your One-Time Password (OTP) for account verification is:</div>
      <br/>
      <h3 style="background-color: #f0f0f0; padding: 15px; font-size: 24px; text-align: center; color: #333; border-radius: 8px;">
        ${otp}
      </h3>
      <br/>
    
      <p>The OTP is valid for 15 minutes. Please use it to complete your verification process.</p>
      <br/>
    
      <p>If you didn't request this, please ignore this email.</p>
      <br/>
    
      <p>Best regards,</p>
      <br/>
      <p>Library Management</p>`,
  };
};
export const passwordChangeTemplate = ({ name, email }) => {
  return {
    from: `"Local Library" <${process.env.EMAIL}>`, // sender address
    to: `${email}`, // recipient address
    subject: "Your Password Has Just Been Changed", // Subject line
    text: `Hello ${name},\n\nWe wanted to inform you that your password has just been successfully changed.\n\nIf you did not make this change, please reset your password immediately by following the instructions on our website.\n\nAdditionally, we recommend contacting our support team at support@localibrary.com for further assistance.\n\nIf you made this change, you can safely disregard this email.\n\nBest regards,\nLibrary Management`, // plain text body
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="text-align: center; color: #FF6347;">Hello <strong>${name}</strong>,</h2>
            <p>We wanted to inform you that your password has just been successfully changed.</p>
            <p>If you did not make this change, please reset your password immediately by following the instructions on our website.</p>
            <p>If you are unable to reset your password or need further assistance, please contact our support team at <a href="mailto:support@localibrary.com">support@localibrary.com</a>.</p>
            <p>If you made this change, you can safely disregard this email.</p>
            <br />
            <p>Best regards,</p>
            <p>Library Management</p>
          </div>
        </body>
      </html>`,
  };
};
