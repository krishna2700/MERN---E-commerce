import nodemailer from "nodemailer";

// bust wtnw rcna mija
// MERN-Krishna
// krishnaruparelia0207@gmail.com

const sendVerificatiomEmail = async (token, email, name, id) => {
  const html = `
    <html>
    <body>
    <div>
    <h1>Hello ${name}</h1>
    <p>
    Welcome to MERN E-commerce. Please verify your email by clicking on the
    link below
    </p>
    <a
    href="http://localhost:3000/email-verify/${token}"
    target="_blank"
    rel="noopener noreferrer"
    >
    Verify Email
    </a>
    </div>
    </body>
    </html>
    `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "krishnaruparelia0207@gmail.com",
      pass: "bust wtnw rcna mija",
    },
  });

  const mailOptions = {
    from: "krishnaruparelia0207@gmail.com",
    to: email,
    subject: "Verify Email",
    html: html,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${email}`);
      console.log(info.response);
    }
  });
};

export default sendVerificatiomEmail;
