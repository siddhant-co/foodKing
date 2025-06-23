
'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";
import UserAvatar from "../useravatar/UserAvatar";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";





export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navLinks = [
    { label: "Home Page", href: "/", hasDropdown: true },
    { label: "Shop", href: "/shop", hasDropdown: true },
    { label: "NewArrival", href: "/new-arrivals", hasDropdown: true },
    { label: "Bestselling", href: "/bestsellers", hasDropdown: true },
    { label: "Contact", href: "#", hasDropdown: false },
  ];




  // Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // scrolling down
          setShowNavbar(false);
        } else {
          // scrolling up
          setShowNavbar(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);


  // wishlist

  const wishlistCount = useSelector((state: RootState) => state.wishlist.items.length);

  // cart
  const cartCount = useSelector((state: RootState) => state.cart.items.length);


  return (
    <nav
      className={`w-full bg-[#f8f5ef] border-b border-gray-200 fixed top-0 left-0 z-50 transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href={"/"}>
          <Image src="https://foodking-react.vercel.app/assets/img/logo/logo.svg" alt="Logo" width={150} height={150}  />
          </Link>

        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group">
              <Link href={link.href} className="font-bold hover:text-red-600 flex items-center gap-1">
                {link.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          {/* <Link href="/wishlist"><Heart className="hover:text-[] transition-colors"/></Link> */}
          <div className="relative">
  <Link href="/wishlist">
    <Heart size={25} className="hover:text-red-600 transition-colors" />
  </Link>

  {wishlistCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
      {wishlistCount}
    </span>
  )}
</div>
<div className="relative">
  <Link href="/cart">
    <ShoppingCart size={25} className="hover:text-red-600 transition-colors" />
  </Link>
  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
      {cartCount}
    </span>
  )}
</div>
 
          <UserAvatar />
          {/* Mobile menu toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#f8f5ef] px-4 pb-4">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="block py-2 font-bold">
              {link.label}
            </Link>
          ))}
          <button className="w-full bg-red-600 text-white py-2 mt-2 rounded-lg font-bold">
            CONTACT US
          </button>
        </div>
      )}
    </nav>
  );
}
