// import { notFound } from 'next/navigation';
// import ProductDetails from '@/app/components/productDetails/ProductDetails';
// import { Product } from '../../../../types/product';
// import { Subcategory } from '../../../../types/category';

// interface PageProps {
//   params: { slug: string };
// }

// export default async function Page({ params }: PageProps) {

//   const { slug } = params;

//   const productRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/info/${slug}`, {
//     cache: 'no-store',
//   });

//   if (!productRes.ok) return notFound();

//   const product: Product = await productRes.json();

//   const subcategoryRes = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/category/subcategory/${product.subcategory.slug}`,
//     { cache: 'no-store' }
//   );

//   if (!subcategoryRes.ok) return notFound();

//   const subcategory: Subcategory = await subcategoryRes.json();

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <ProductDetails product={product} subcategory={subcategory} />
//     </div>
//   );
// }



import { notFound } from 'next/navigation';
import ProductDetails from '@/app/components/productDetails/ProductDetails';
import { Product } from '../../../../types/product';
import { Subcategory } from '../../../../types/category';

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  const productRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/info/${slug}`, {
    cache: 'no-store',
  });

  if (!productRes.ok) return notFound();

  const product: Product = await productRes.json();

  const subcategoryRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/category/subcategory/${product.subcategory.slug}`,
    { cache: 'no-store' }
  );

  if (!subcategoryRes.ok) return notFound();

  const subcategory: Subcategory = await subcategoryRes.json();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ProductDetails product={product} subcategory={subcategory} />
    </div>
  );
}
