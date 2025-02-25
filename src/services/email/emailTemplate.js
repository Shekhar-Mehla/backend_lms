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
