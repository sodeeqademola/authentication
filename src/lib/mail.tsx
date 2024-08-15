"use server";
import nodemailer from "nodemailer";

export const sendMail = async (emailer: string, body: string) => {
  const { MAIL_USER, MAIL_PASS, SMTP_USER, SMTP_PASS } = process.env;
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    const info = await transport.sendMail({
      from: MAIL_USER,
      to: emailer,
      subject: "SignUp Authentication",
      html: body,
    });
    // console.log(info);
  } catch (error) {
    console.log(error);
  }
};
