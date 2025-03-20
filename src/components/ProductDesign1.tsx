import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';

function Product({image, title}: {image: string, title: string}) {
  return (
    <div className='w-full sm:w-[463px] h-[316px] m-4 mt-6 bg-gray-300 relative'>
        <Image 
        src={image}
        alt={title} 
        objectFit='cover'
        fill />
        <Button className='absolute bottom-10 rounded-full px-5 py-5 left-10'>{title}</Button>
    </div>
  )
}

export default Product;