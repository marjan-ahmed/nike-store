'use client'
import { client } from '@/sanity/lib/client';
import React, { useEffect, useState } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { ChevronDown } from 'lucide-react';
import { HiSlash } from "react-icons/hi2";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

function ProductListingHeader() {
    const [products, setProducts] = useState(0);

    useEffect(() => {
        async function fetchProducts() {
            const data = await client.fetch(`
            count(*[_type == "product"])    
            `);
            console.log(data)
            setProducts(data);
        }

        fetchProducts();
    }, []);

    let product: string = 'Air Max Dn8'
  return (
    <div className='w-full font-semibold px-4 sm:px-12 mt-10 flex justify-between items-end'>
        <div className="flex flex-col">
        <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
        <HiSlash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Shop</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
        <HiSlash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>{product}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    
    <h1 className='text-[20px] font-semibold'>Air Max Dn8 ({products})</h1>
        </div>
        <div className="flex gap-6">
        <DropdownMenu>
  <DropdownMenuTrigger><div className='flex items-center gap-1'>Sort By <ChevronDown size={18} /></div></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Featured</DropdownMenuItem>
    <DropdownMenuItem>Newest</DropdownMenuItem>
    <DropdownMenuItem>Price: High-Low</DropdownMenuItem>
    <DropdownMenuItem>Price: Low-High</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>


        </div>
    </div>
  )
}

export default ProductListingHeader;