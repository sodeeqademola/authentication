import { emailVerified } from "@/components/ServerActions/actions";
import { Button } from "@nextui-org/react";
import React from "react";
type paramsProps = {
  params: {
    id: string;
  };
};

const page = ({ params }: paramsProps) => {
  //   console.log(params.id);
  emailVerified(params.id);

  return (
    <div>
      <h1>Please Log In You have been Verified</h1>
    </div>
  );
};

export default page;
