// import Image from 'next/image';
// import { notFound } from 'next/navigation';

// type Product = {
//   id: number;
//   name: string;
//   description: string;
//   imageUrl: string;
//   basePrice: number;
//   oldPrice?: number | null;
//   slug: string;
// };

// type Subcategory = {
//   id: number;
//   name: string;
//   imageUrl: string;
//   category: {
//     name: string;
//     slug: string;
//   };
//   products: Product[];
// };

// export default async function SubcategoryPage({ params }: { params: { slug: string } }) {
//   const res = await fetch(`https://ecom-testing.up.railway.app/category/subcategory/${params.slug}`, {
//     cache: 'no-store',
//   });

//   if (!res.ok) return notFound();

//   const subcategory: Subcategory = await res.json();

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-4">{subcategory.name}</h1>
     
//     </div>
//   );
// }


// import Image from 'next/image';
// import { notFound } from 'next/navigation';
// import { Product } from '../../../../types/product';
// import { Subcategory } from '../../../../types/category';
// import ProductCard from '@/app/components/productCard.tsx/ProductCard';


// export default async function SubcategoryPage({ params }: { params: { slug: string } }) {
//   const res = await fetch(`https://ecom-testing.up.railway.app/category/subcategory/${params.slug}`, {
//     cache: 'no-store',
//   });

//   if (!res.ok) return notFound();

//   const subcategory: Subcategory & { products: Product[] } = await res.json();

//   return (
//     <div className="max-w-7xl mx-auto ">
//       {/* <h1 className="text-3xl font-bold text-center mb-6">{subcategory.name}</h1> */}
//       <div className="relative mb-10 w-full max-w-full h-[300px] rounded-lg overflow-hidden">
//   {/* Subcategory Image */}
//   <Image
//     src={subcategory.imageUrl}
//     alt={subcategory.name}
//     fill
//     className="object-cover w-full h-full"
//   />

//   {/* Overlay Name */}
//   <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//     <h1 className="text-3xl font-bold text-white text-center px-4">
//       {subcategory.name}
//     </h1>
//   </div>
// </div>

// {subcategory.products.length > 0 ? (
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//     {subcategory.products.map((product: any) => {
//       const fullProduct: Product = {
//         id: product.id,
//         name: product.name,
//         basePrice: product.basePrice,
//         oldPrice: product.oldPrice ?? 0,
//         imageUrl: product.imageUrl,
//         description: product.description,
//         sellingPrice: product.sellingPrice,
//         slug: product.slug,
//         category: product.category ?? null,
//         variants: product.variants ?? [],
//         productVariants: product.productVariants ?? [],
//         tags: product.tags ?? [],
//         productId: 0
//       };

//       return <ProductCard key={fullProduct.id} product={fullProduct} />;
//     })}
//   </div>
// ) : (
//   <p className="text-center text-gray-500 mt-10 text-lg">
//     No products found in this subcategory.
//   </p>
// )}

//     </div>
//   );
// }


import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Product } from '../../../../types/product';
import { Subcategory } from '../../../../types/category';
import ProductCard from '@/app/components/productCard.tsx/ProductCard';

export default async function SubcategoryPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`https://ecom-testing.up.railway.app/category/subcategory/${params.slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) return notFound();

  const subcategory: Subcategory & { products: Product[] } = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Subcategory Hero Section */}
      <div className="relative mb-10 w-full max-w-full h-[300px] rounded-lg overflow-hidden">
        <Image
          src={subcategory.imageUrl}
          alt={subcategory.name}
          fill
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white text-center px-4">
            {subcategory.name}
          </h1>
        </div>
      </div>

      {/* Product Grid */}
      {subcategory.products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {subcategory.products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No products found in this subcategory.
        </p>
      )}
    </div>
  );
}
