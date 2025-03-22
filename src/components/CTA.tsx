import Link from 'next/link';
import React from 'react'

function CTA() {
  return (
    <div className='w-full h-14 bg-[#F5F5F5] flex gap-3 font-semibold border-gray-200 border-b-2 justify-center items-center'>
        <h1 className='uppercase text-[16px]'>shop all new arrivals</h1>
        <Link href={'#'} className='text-[12px] underline'>Shop</Link>
    </div>
  )
}

export default CTA;