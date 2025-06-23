// app/products/page.tsx


import { fetchProducts } from '@/app/function/function';
import ProductCard from '../components/productCard.tsx/ProductCard';
import AnimatedHeading from '../components/animatedHeading/AnimatedHeading';
import Link from 'next/link';
import { Product } from '../../../types/product';


export default async function ProductsPage() {
  const products = await fetchProducts(1,10 );

  if (products.length === 0) {
    return <div className="text-center text-xl p-6">No products found.</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-[#faf1df]">
     
     <AnimatedHeading text="POPULAR FOOD ITEMS" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 ">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link href={'/shop'}>
        <button className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition">
          VIEW MORE
        </button>
        </Link>
      
      </div>
    </div>
  );
}
