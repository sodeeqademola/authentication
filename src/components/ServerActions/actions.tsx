"use server";
import prisma from "@/lib/db";
import { sendMail } from "@/lib/mail";
import { mailTemplate } from "@/lib/mailTemplate";
import bcrypt from "bcryptjs";
import Handlebars from "handlebars";
import { signIn } from "next-auth/react";

//submit form
export const submitAction = async (data: any) => {
  //   console.log(data.password);
  const { password, email, firstName, lastName, phone } = data;
  const hashedPasssword = await bcrypt.hashSync(
    password,
    bcrypt.genSaltSync(10)
  );

  const result = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!result) {
    const response = await prisma.user.create({
      data: {
        password: hashedPasssword,
        email,
        firstName,
        lastName,
        phone,
      },
    });
    const template = Handlebars.compile(mailTemplate);
    const name = firstName;
    const url = `${process.env.NEXTAUTH_URL}/activatedmail/${response.id}`;
    const body = template({
      name,
      url,
    });
    const emailer = response.email;

    // console.log(name, response?.id, url);
    // console.log(response.email);
    await sendMail(emailer, body);
  } else {
    console.log("acccount already existed");
    // throw new Error("acccount already existed");
  }
};

export const emailVerified = async (id: string) => {
  // console.log(id);

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      emailVerified: new Date(),
    },
  });
};

export const changePassword = async (email: string, password: string) => {
  const isEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  try {
    if (isEmail) {
      const hashedPassord = await bcrypt.hashSync(password, 10);
      const res = await prisma.user.update({
        where: {
          email,
        },
        data: {
          password: hashedPassord,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
