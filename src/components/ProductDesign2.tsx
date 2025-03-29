import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface Product {
    name: string;
    slug: string;
    description: string;
    tag: string;
    price: number;
    sizes: string[];
    category: string;
    images: string[];
}

async function ProductDesign2() {
    const query = `
    *[_type == "product"] | order(slug.current asc) {
        name,
        "slug": slug.current,
        tag,
        price,
        sizes,
        category,
        "images": images[].asset->url
    }`;
    
    const data = await client.fetch(query);
    console.log(data);

    return (
        <div className="w-full flex flex-wrap justify-center gap-3 px-4">
            {data.map((product: Product) => (
                <Link key={product.slug} href={`/air-max-dn8-shoes/${product.slug}`} className="w-full sm:w-[462px] h-full sm:h-[619px]">
                    <div className="h-full sm:h-[445px] mt-6 md:mt-mt-3 relative">
                        {product.images?.[0] && (
                            <Image 
                                src={product.images[0]}
                                alt={product.name}
                                width={200}
                                height={200}
                                className="object-cover w-full h-full"
                            />
                        )}
                    </div>
                    <h5 className="text-md font-semibold text-red-800 mt-2">{product.tag}</h5>
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <h3 className="opacity-70">{product.category}</h3>
                    <h3 className="opacity-70">1 Colour</h3>
                    <span className="block text-gray-500">${product.price}</span>
                </Link>
            ))}
        </div>
    );
}

export default ProductDesign2;
