'use client'
import React from 'react'
import { Separator } from './ui/separator';
import Link from 'next/link';
import { useUser } from '@clerk/clerk-react';
import { FiUser } from 'react-icons/fi';

function AuthButtons() {
    const { user, isSignedIn } = useUser();
  return (
    <>
        {isSignedIn ? (
            <div className="flex gap-1 items-center">
              <Separator orientation="vertical" className="mr-2  h-4 bg-black" />
                <h1 className='text-[13px]'>Hi, {user.firstName}!</h1>
                <FiUser size={22} />
                </div>
        ) : (
            <div className='flex items-center gap-x-3'>
            <Separator orientation="vertical" className="h-4 bg-black" />
                    <li className="cursor-pointer">Join Us</li>
                    <Separator orientation="vertical" className="h-4 bg-black" />
        
                    {/* Sign In Link */}
                    <li>
                      <Link href="/signin" className="cursor-pointer">
                        Sign In
                      </Link>
                    </li>
            </div>
        )}
    </>
  )
}

export default AuthButtons;