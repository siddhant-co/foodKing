// import ProductDetails from '@/app/components/productDetails/ProductDetails';
// import { fetchProductBySlug, fetchSubcategoryBySlug } from '@/app/function/function';
// import { Subcategory } from '../../../../types/category';

// interface ProductPageProps {
//   params: { slug: string };
// }

// export default async function SingleProductPage({ params }: ProductPageProps) {
//   const { slug } =  params;

//   try {
//     const product = await fetchProductBySlug(slug);

//     if (!product) {
//       return <div className="text-center text-xl p-6">Product not found.</div>;
//     }

//     const subcategory: Subcategory = await fetchSubcategoryBySlug(product.subcategory.slug);

//     return (
//       <div className="p-6 max-w-7xl mx-auto">
//         <ProductDetails product={product} subcategory={subcategory} />
//       </div>
//     );
//   } catch (error) {
//     console.error('Error fetching product or subcategory:', error);
//     return (
//       <div className="text-center text-xl p-6 text-red-500">
//         Failed to load product details. Please try again later.
//       </div>
//     );
//   }
// }


// app/singleProduct/[slug]/page.tsx

// import ProductDetails from '@/app/components/productDetails/ProductDetails';
// import { fetchProductBySlug, fetchSubcategoryBySlug } from '@/app/function/function';
// import { Subcategory } from '../../../../types/category';

// interface ProductPageProps {
//   params: { slug: string };
// }

// export default async function SingleProductPage({ params }: ProductPageProps) {
//   const { slug } = params; // ✅ CORRECT — no await here

//   try {
//     const product = await fetchProductBySlug(slug);

//     if (!product) {
//       return <div className="text-center text-xl p-6">Product not found.</div>;
//     }

//     const subcategory: Subcategory = await fetchSubcategoryBySlug(product.subcategory.slug);

//     return (
//       <div className="p-6 max-w-7xl mx-auto">
//         <ProductDetails product={product} subcategory={subcategory} />
//       </div>
//     );
//   } catch (error) {
//     console.error('Error fetching product or subcategory:', error);
//     return (
//       <div className="text-center text-xl p-6 text-red-500">
//         Failed to load product details. Please try again later.
//       </div>
//     );
//   }
// }


//

// import { notFound } from 'next/navigation';
// import ProductDetails from '@/app/components/productDetails/ProductDetails';
// import { Product } from '../../../../types/product';
// import { Subcategory } from '../../../../types/category';

// interface ProductPageProps {
//   params: { slug: string };
// }

// export default async function SingleProductPage(props: ProductPageProps) {
//   return await renderProductPage(props);
// }

// // ✅ This avoids triggering the Next.js 15.3 bug
// async function renderProductPage({ params }: ProductPageProps) {
//   const slug = params.slug;

//   const productRes = await fetch(`https://ecom-testing.up.railway.app/product/info/${slug}`, {
//     cache: 'no-store',
//   });

//   if (!productRes.ok) return notFound();

//   const product: Product = await productRes.json();

//   const subcategoryRes = await fetch(
//     `https://ecom-testing.up.railway.app/category/subcategory/${product.subcategory.slug}`,
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

export default async function SingleProductPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const productRes = await fetch(`https://ecom-testing.up.railway.app/product/info/${slug}`, {
    cache: 'no-store',
  });

  if (!productRes.ok) return notFound();

  const product: Product = await productRes.json();

  const subcategoryRes = await fetch(
    `https://ecom-testing.up.railway.app/category/subcategory/${product.subcategory.slug}`,
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
