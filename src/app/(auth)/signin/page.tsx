import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <h1 className="text-center">
        Don not Have an Account{" "}
        <span className="text-blue-700">
          <Link href={"/signup"}>Sign Up</Link>
        </span>
      </h1>
      <div>
        <SignUpForm />
        <div className="text-center">
          <Link href="/forgotpassword"> Forgot Your Password ?</Link>
        </div>
      </div>
    </div>
  );
};

export default page;
