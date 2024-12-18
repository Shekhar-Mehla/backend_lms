

function emailTemplate({name,url,email}) {
  return (
    {
      from: '"Local Library " <smehla147@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: `Hello ${name}`  , // plain text body
      html: `<p>Hello </p>
<h2>${name}</h2>
<br/>
<br/>
<br/>
<p>please click on the button below to activate your account</p>
<br/>
<br/>
<a href = ${url }>
<button >activate</button>
</a>
<br/>
<br/>
<br/>
<p>Best regards</p>
<br></br>
<br></br>
<p>Library managment</p>`, // html body
    }
  )
}

export default emailTemplate