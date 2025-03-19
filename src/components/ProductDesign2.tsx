import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

async function ProductDesign2() {
    const query = `*[_type == "product"]{
        name,
        "slug": slug.current,
        description,
        tag,
        price,
        sizes,
        category,
        "images": images[].asset->url
    }`;
    
    const data = await client.fetch(query);
    console.log(data);

    return (
        <div className="w-full flex flex-wrap justify-center gap-4">
            {data.map((product: any) => (
                <Link key={product.slug} href={`/air-max-dn8-shoes/${product.slug}`} className="w-full sm:w-[462px] h-full sm:h-[619px] p-4 bg-gray-200 hover:shadow-lg transition-shadow">
                    <div className="h-[445px] relative">
                        {product.images?.[0] && (
                            <Image 
                                src={product.images[0]}
                                alt={product.name}
                                width={400}
                                height={400}
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
