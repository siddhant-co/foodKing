'use client';

import { useEffect, useState } from 'react';
import { fetchCategories } from '../function/function';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Category = {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    loadCategories();
  }, []);

  if (!categories.length) {
    return <div className="text-center text-xl p-6">No categories found.</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto overflow-hidden bg-[#f4f5ef]">
      <motion.h1
        className="text-3xl font-bold text-center mb-10 text-orange-600 tracking-wide relative"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="relative inline-block">
          <span className="absolute inset-0 bg-orange-300 opacity-30 blur-md rounded-xl"></span>
          <span className="relative z-10">SHOP BY CUISINE</span>
        </span>
      </motion.h1>

      <motion.div
        className="flex gap-6"
        animate={{ x: ['0%', '-100%'] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 20,
          ease: 'linear',
        }}
      >
        {[...categories, ...categories].map((category, idx) => (
          <Link
            key={`${category.id}-${idx}`} // ✅ Unique key using id + index
            href={`/subcategory/${category.slug}`}
            className="group"
          >
            <div className="overflow-hidden w-[250px] h-[150px] rounded">
              <Image
                src={category.imageUrl}
                alt={category.name}
                width={200}
                height={200}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110 rounded"
              />
            </div>
            <h2 className="text-lg font-semibold mt-4 text-center group-hover:text-orange-500 transition">
              {category.name}
            </h2>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}


