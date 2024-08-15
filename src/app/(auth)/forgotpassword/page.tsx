"use client";
import { changePassword } from "@/components/ServerActions/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";

import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const page = () => {
  const emailSchema = z.object({
    email: z.string().email("this is not email"),
    password: z
      .string()
      .min(6, "this chars can not be less than 6")
      .max(32, "this chars can not be more than 32"),
  });

  type emailSchemaType = z.infer<typeof emailSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<emailSchemaType>({
    resolver: zodResolver(emailSchema),
  });

  const submit = async (data: emailSchemaType) => {
    console.log(data);
    const { email, password } = data;
    try {
      await changePassword(email, password);
      toast.success("password changed successfuly");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div>
      <form
        className="flex flex-col h-screen justify-center gap-3 items-center"
        method="post"
        onSubmit={handleSubmit(submit)}
      >
        <Input
          type="email"
          label="Email"
          {...register("email")}
          errorMessage={errors.email?.message}
          isInvalid={!!errors.email}
        />
        <Input
          type="password"
          label="Enter new Password"
          {...register("password")}
          errorMessage={errors.password?.message}
          isInvalid={!!errors.password}
        />
        <Button type="submit">Confirm Mail</Button>
      </form>
    </div>
  );
};

export default page;
