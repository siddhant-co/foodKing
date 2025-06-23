


// 'use client';

// import { useEffect, useState } from 'react';
// import { fetchCategories } from '../function/function';
// import { Category } from '../../../types/category';
// import { Product } from '../../../types/product';
// import ProductCard from '../components/productCard.tsx/ProductCard';

// export default function ShopPage() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>('all');
//   const [allProducts, setAllProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const load = async () => {
//       const data = await fetchCategories();
//       setCategories(data);

//       const mergedProducts = data.flatMap((cat) => cat.products);
//       setAllProducts(mergedProducts);
//     };

//     load();
//   }, []);

//   const getFilteredProducts = (): Product[] => {
//     if (selectedCategory === 'all') return allProducts;

//     const category = categories.find((c) => c.slug === selectedCategory);
//     return category ? category.products : [];
//   };

//   const products = getFilteredProducts();

//   return (
//     <div className="max-w-7xl mx-auto px-4 mt-10 ">
//       {/* Category Filter */}
//       <div className="flex justify-center space-x-4 overflow-x-auto pb-4 mb-6 border-b ">
//         <button
//           onClick={() => setSelectedCategory('all')}
//           className={`py-2 px-4 font-semibold border-b-2 ${
//             selectedCategory === 'all'
//               ? 'border-orange-500 text-orange-600'
//               : 'border-transparent'
//           }`}
//         >
//           All
//         </button>
//         {categories.map((cat) => (
//           <button
//             key={cat.id}
//             onClick={() => setSelectedCategory(cat.slug)}
//             className={`py-2 px-4 font-semibold border-b-2 whitespace-nowrap ${
//               selectedCategory === cat.slug
//                 ? 'border-orange-500 text-orange-600'
//                 : 'border-transparent'
//             }`}
//           >
//             {cat.name}
//           </button>
//         ))}
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//         {products.length ? (
//           products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500">No products found.</p>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { fetchCategories } from '../function/function';
import { Category } from '../../../types/category';
import { Product } from '../../../types/product';
import ProductCard from '../components/productCard.tsx/ProductCard';

export default function ShopPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // 🔹 loader state

  useEffect(() => {
    const load = async () => {
      setLoading(true); // 🔹 show loader
      try {
        const data = await fetchCategories();
        setCategories(data);
        const mergedProducts = data.flatMap((cat) => cat.products);
        setAllProducts(mergedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // 🔹 hide loader
      }
    };

    load();
  }, []);

  const getFilteredProducts = (): Product[] => {
    if (selectedCategory === 'all') return allProducts;

    const category = categories.find((c) => c.slug === selectedCategory);
    return category ? category.products : [];
  };

  const products = getFilteredProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      {/* 🔸 Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#e7000b] border-t-transparent" />
        </div>
      ) : (
        <>
          {/* Category Filter */}
          <div className="flex justify-center space-x-4 overflow-x-auto pb-4 mb-6 border-b">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`py-2 px-4 font-semibold border-b-2 ${
                selectedCategory === 'all'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`py-2 px-4 font-semibold border-b-2 whitespace-nowrap ${
                  selectedCategory === cat.slug
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {products.length ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
