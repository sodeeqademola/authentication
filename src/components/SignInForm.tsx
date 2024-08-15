"use client";
import { Button, Checkbox, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { IoMdContact } from "react-icons/io";
import { CiPhone } from "react-icons/ci";
import { CgPassword } from "react-icons/cg";
import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import Image from "next/image";
import { motion } from "framer-motion";
import { z } from "zod";
import PasswordStrength from "./PasswordStrength";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitAction } from "./ServerActions/actions";
import toast from "react-hot-toast";

const SignInForm = () => {
  const [seePassword, setSeePassword] = useState(false);
  const formSchema = z
    .object({
      firstName: z
        .string()
        .min(6, "minimun of 6 chars")
        .max(45, "max of 45 chars"),
      lastName: z
        .string()
        .min(6, "minimun of 6 chars")
        .max(45, "max of 45 chars"),
      email: z.string().email("must be an email"),
      phone: z.string().refine((value) => {
        return value;
      }, "required"),
      password: z
        .string()
        .min(4, "minimum of 4 chars")
        .max(32, "max of 32 chars"),
      confirmPassword: z
        .string()
        .min(4, "minimum of 4 chars")
        .max(32, "max of 32 chars"),
      term: z.boolean().refine(
        (value) => {
          return value === true;
        },
        {
          message: "must agree to the terms",
        }
      ),
    })
    .refine(
      (value) => {
        return value.password === value.confirmPassword;
      },
      {
        message: "password and confirmpassword missmached",
        path: ["confirmPassword"],
      }
    );
  type formShemaType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
  } = useForm<formShemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    // console.log(data);
    try {
      const { term, confirmPassword, ...others } = data;
      submitAction(others);
      toast.success("signed up successfully");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="flex  justify-between items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <motion.div
          className="rounded-md border-2 border-gray-500 p-2 space-y-2"
          initial={{ x: "150vw", scale: 1.5 }}
          animate={{ x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="flex gap-2 justify-between items-center">
            <Input
              {...register("firstName")}
              label="FirstName"
              type="text"
              errorMessage={errors.firstName?.message}
              isInvalid={!!errors.firstName}
              startContent={<IoMdContact className="text-white" />}
            />
            <Input
              {...register("lastName")}
              label="LastName"
              type="text"
              errorMessage={errors.lastName?.message}
              isInvalid={!!errors.lastName}
              startContent={<IoMdContact className="text-white" />}
            />
          </div>
          <Input
            {...register("email")}
            label="Email"
            type="email"
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
            startContent={<AiOutlineMail className="text-white" />}
          />
          <Input
            {...register("phone")}
            label="Phone"
            type="text"
            errorMessage={errors.phone?.message}
            isInvalid={!!errors.phone}
            startContent={<CiPhone className="text-white" />}
          />
          <Input
            {...register("password")}
            label="Password"
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
            type={seePassword ? "text" : "password"}
            startContent={<CgPassword className="text-white" />}
            endContent={
              seePassword ? (
                <IoEyeSharp
                  className="text-white cursor-pointer"
                  onClick={() => {
                    setSeePassword(false);
                  }}
                />
              ) : (
                <FaEyeSlash
                  className="text-white cursor-pointer"
                  onClick={() => {
                    setSeePassword(true);
                  }}
                />
              )
            }
          />
          <PasswordStrength password={watch().password} />
          <Input
            {...register("confirmPassword")}
            label="ComfirmPassword"
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
            type={seePassword ? "text" : "password"}
            startContent={<CgPassword className="text-white" />}
            endContent={
              seePassword ? (
                <IoEyeSharp
                  className="text-white cursor-pointer"
                  onClick={() => {
                    setSeePassword(false);
                  }}
                />
              ) : (
                <FaEyeSlash
                  className="text-white cursor-pointer"
                  onClick={() => {
                    setSeePassword(true);
                  }}
                />
              )
            }
          />
          <Checkbox size="sm" {...register("term")} isInvalid={!!errors.term}>
            <h1 className="text-black">
              I Accept The <span className="text-blue-700">Terms</span>{" "}
            </h1>
          </Checkbox>
          {errors.term && (
            <p className={"text-red-900"}>{errors.term.message}</p>
          )}{" "}
          <br />
          <div className="flex justify-center">
            <Button type="submit" color="primary" isDisabled={isLoading}>
              {isLoading ? "Submiting..." : "Submit"}
            </Button>
          </div>
        </motion.div>
      </form>
      <motion.div
        className=""
        initial={{ x: "-100vw", scale: 0.1 }}
        animate={{ x: 0, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <Image
          src={"/Login.jpg"}
          alt="login"
          priority
          quality={95}
          className="h-full w-full place-self-center shrink-0"
          width={400}
          height={500}
        />
      </motion.div>
    </div>
  );
};

export default SignInForm;
