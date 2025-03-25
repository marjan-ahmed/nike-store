"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const SignInRedirectPage = () => {
  const { isSignedIn } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      const returnUrl = searchParams.get("return_url") || "/";
      router.replace(returnUrl); // Redirect after sign-in
    }
  }, [isSignedIn, router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg font-semibold">Redirecting...</p>
    </div>
  );
};

export default SignInRedirectPage;
