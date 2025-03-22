"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

const SignInPage = () => {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn redirectUrl={redirectUrl} />
    </div>
  );
};

export default SignInPage;
