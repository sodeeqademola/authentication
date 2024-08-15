import SignInForm from "@/components/SignInForm";
import { sendMail } from "@/lib/mail";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <h1 className="text-center">
        Already Signed Up{" "}
        <span className="text-blue-700">
          <Link href={"/signin"}>Sign In</Link>
        </span>
      </h1>
      <div>
        <SignInForm />
      </div>
    </div>
  );
};

export default page;
