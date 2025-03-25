"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { FiUser } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function UserAccountMenu() {
  const { user, isSignedIn } = useUser();

  return (
    <div>
      {isSignedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            <FiUser size={20}/>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <span className="font-semibold">{user?.fullName}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>{user?.primaryEmailAddress?.emailAddress}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SignOutButton>
                <span className="text-red-500 cursor-pointer">Logout</span>
              </SignOutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/signin">
        <FiUser size={20}/>
        </Link>
      )}
    </div>
  );
}
