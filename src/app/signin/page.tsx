"use client";

import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn redirectUrl="/" />
    </div>
  );
};

export default SignInPage;
