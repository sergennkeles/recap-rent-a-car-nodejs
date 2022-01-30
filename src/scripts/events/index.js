const eventEmitter = require("./EventEmitter");
const nodemailer = require("nodemailer");

module.exports = () => {
  eventEmitter.on("send", (data) => {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // generated ethereal user
        pass: process.env.SMTP_PASSWORD, // generated ethereal password
      },
    });
    let info = transporter.sendMail({
      from: process.env.SMTP_FROM,
      ...data, // eventEmitter.emit’ten gelen datayı user’a gönderdik
    });
  });
};
 