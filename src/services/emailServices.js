import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export const sendEmail = async (email, subject, html) => {
  try {
    await transporter.sendMail({
      from: 'MateTo <ignaciocafiero12@gmail.com>',
      to: email,
      subject,
      html,
    });

    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}