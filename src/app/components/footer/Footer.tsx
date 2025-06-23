'use client';

import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Image from "next/image";
import { fetchCategories } from '@/app/function/function';


type Category = {
  id: number;
  name: string;
  slug: string;
};


const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data || []);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };

    loadCategories();
  }, []);
  

  return (
    <footer className="bg-[#f2efe9] text-[#5c5c5b] mt-5 border-t overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* Brand Info */}
        <div>
          {/* <h2 className="text-3xl font-extrabold text-orange-500 mb-3">FoodKing 👑</h2> */}
                  <Image src="https://foodking-react.vercel.app/assets/img/logo/logo.svg" alt="Logo" width={200} height={200} />
          <p className="text-sm leading-relaxed">Your royal destination for fast, delicious, and affordable food. Order now and satisfy your hunger like a king!</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-orange-500 transition">Home Page</Link></li>
            <li><Link href="/shop" className="hover:text-orange-500 transition">Shop</Link></li>
            <li><Link href="/new-arrivals" className="hover:text-orange-500 transition">New Arrival</Link></li>
            <li><Link href="/bestsellers" className="hover:text-orange-500 transition">Bestselling</Link></li>
            <li><Link href="#" className="hover:text-orange-500 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Menu Categories */}
        {/* <div>
          <h3 className="text-lg font-semibold mb-4">Menu Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/menu/burgers" className="hover:text-orange-500 transition">Non-veg</Link></li>
            <li><Link href="/menu/pizza" className="hover:text-orange-500 transition">Veg</Link></li>
            <li><Link href="/menu/drinks" className="hover:text-orange-500 transition">Cold Drinks</Link></li>
            <li><Link href="/menu/desserts" className="hover:text-orange-500 transition">Hot Drinks</Link></li>
          </ul>
        </div> */}

<div>
          <h3 className="text-lg font-semibold mb-4">Menu Categories</h3>
          <ul className="space-y-2 text-sm">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/subcategory/${cat.slug}`}
                    className="hover:text-orange-500 transition"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-gray-400">Loading...</li>
            )}
          </ul>
        </div>

        {/* Newsletter & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm mb-4">Subscribe to get the latest offers and discounts!</p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <button
              type="submit"
              className="bg-[#e7000b] hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm transition"
            >
              Subscribe
            </button>
          </form>

          <div className="flex space-x-4 mt-6">
            <Link href="#"><FaFacebookF className="text-xl hover:text-orange-500 transition" /></Link>
            <Link href="#"><FaInstagram className="text-xl hover:text-orange-500 transition" /></Link>
            <Link href="#"><FaTwitter className="text-xl hover:text-orange-500 transition" /></Link>
            <Link href="#"><FaYoutube className="text-xl hover:text-orange-500 transition" /></Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-orange-200 text-center py-4 text-sm text-gray-600 border-t">
        © {new Date().getFullYear()} FoodKing. All rights reserved. 👑
      </div>
    </footer>
  );
};

export default Footer;
