import nodemailer from "nodemailer";

const sendPasswardResetEmail = async (token, email, name, id) => {
  const html = `
        <html>
        <body>
        <div>
        <h1>Hello ${name}</h1>
        <p>
        You can reset your password by clicking on the link below
        </p>
        <a
        href="http://localhost:3000/password-reset/${token}"
        target="_blank"
        rel="noopener noreferrer"
        >
        Reset Password
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
    subject: "Reset Password",
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

export default sendPasswardResetEmail;
