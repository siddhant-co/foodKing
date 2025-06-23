'use client';

import { useState } from 'react';
import { Product } from '../../../../types/product';
import ProductCard from '../productCard.tsx/ProductCard';
import { motion } from 'framer-motion';


interface TrendingProductsProps {
  products: Product[];
}

export default function TrendingProducts({ products }: TrendingProductsProps) {
  const [activeTag, setActiveTag] = useState('bestseller');

  const filteredProducts = products.filter(product =>
    product.tags.includes(activeTag)
  );

  return (
    <div className="mt-10">
      {/* <h2 className="text-3xl font-bold mb-6 text-center">TRENDING PRODUCTS</h2> */}

      <motion.h1
        className="text-3xl font-bold text-center mb-10 text-orange-600 tracking-wide relative"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="relative inline-block">
          <span className="absolute inset-0 bg-orange-300 opacity-30 blur-md rounded-xl"></span>
          <span className="relative z-10">TRENDING PRODUCTS</span>
        </span>
      </motion.h1>
      {/* Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTag('bestseller')}
          className={`px-4 py-2 rounded ${activeTag === 'bestseller' ? 'bg-[#e7000b] text-white' : 'bg-gray-200'}`}
        >
          Bestselling
        </button>
        <button
          onClick={() => setActiveTag('new')}
          className={`px-4 py-2 rounded ${activeTag === 'new' ? 'bg-[#e7000b] text-white' : 'bg-gray-200'}`}
        >
          New Arrival
        </button>
      </div>

  


<div className="w-full flex justify-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center">
    {filteredProducts.length > 0 ? (
      filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))
    ) : (
      <p className="text-center text-lg col-span-full">No products found.</p>
    )}
  </div>
</div>

    </div>
  );
}
