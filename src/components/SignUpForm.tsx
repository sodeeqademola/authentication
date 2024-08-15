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

import toast from "react-hot-toast";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [seePassword, setSeePassword] = useState(false);
  const formSchema = z.object({
    email: z.string().email("must be an email"),
    password: z
      .string()
      .min(4, "minimum of 4 chars")
      .max(32, "max of 32 chars"),
  });

  type formShemaType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
  } = useForm<formShemaType>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    // console.log(data);
    try {
      const { email, password } = data;
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      // console.log(res);
      if (res?.ok) {
        toast.success("Logged in succesfully");
        router.push("/profile");
      } else {
        toast.error("something went wrong with you credentials");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong when logging in");
    }
  };

  return (
    <div className="flex  justify-between items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[100%] p-2 space-y-2"
      >
        <motion.div
          className="rounded-md border-2 w-[100%] border-gray-500 p-2 space-y-2"
          initial={{ x: "150vw", scale: 1.5 }}
          animate={{ x: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Input
            {...register("email")}
            label="Email"
            type="email"
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
            startContent={<AiOutlineMail className="text-white" />}
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
          className="h-full w-[100%] place-self-center shrink-0"
          width={200}
          height={250}
        />
      </motion.div>
    </div>
  );
};

export default SignUpForm;
