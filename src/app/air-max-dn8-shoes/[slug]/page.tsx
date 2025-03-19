import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface ProductDetailProps {
  params: { slug: string };
}

async function ProductDetail({ params }: ProductDetailProps) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    name,
    "slug": slug.current,
    description,
    tag,
    price,
    sizes,
    category,
    highlyRated,
    materialMade,
    "images": images[].asset->url
  }`;

  const product = await client.fetch(query, { slug: params.slug });

  if (!product) {
    return notFound(); // Show 404 if product is not found
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <h5 className="text-red-800">{product.tag}</h5>
      <h3 className="opacity-70">{product.category}</h3>
      <span className="block text-gray-500">${product.price}</span>
      <span>{product.highlyRated ? "Highly Rated" : " "}</span>
      <span>{product.materialMade}</span>

      {/* Display All Images */}
      <div className="flex flex-wrap gap-4 mt-4">
        {product.images?.map((img: string, index: number) => (
          <div key={index} className="w-[300px] h-[300px] relative">
            <Image
              src={img}
              alt={`${product.name} - Image ${index + 1}`}
              width={300}
              height={300}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        ))}
      </div>

      <p className="mt-4">{product.description}</p>
    </div>
  );
}

export default ProductDetail;
