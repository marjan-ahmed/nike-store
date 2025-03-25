"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SignIn, useUser } from "@clerk/nextjs";

const SignInRedirect = () => {
  const { user, isSignedIn } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn) {
      // Get the return_url or fallback to home
      const returnUrl = searchParams.get("return_url") || "/";
      router.replace(returnUrl);
    }
    setLoading(false);
  }, [isSignedIn, router, searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <SignIn />
    </div>
  );
};

export default SignInRedirect;
