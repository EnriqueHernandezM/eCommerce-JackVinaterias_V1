const { createTransport } = require("nodemailer");
const environmentVars = require("../config/config");

const transporter = createTransport({
  //host: "smtp.ethereal.email",
  service: "gmail",
  port: 587,
  auth: {
    user: environmentVars.correoServiceMe,
    pass: environmentVars.correoServiceMePass,
  },
});

async function enviarcorreo(mailOptions) {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (err) {
    console.log(err);
  }
}

module.exports = enviarcorreo;
