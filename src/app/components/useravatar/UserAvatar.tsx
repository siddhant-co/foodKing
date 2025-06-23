'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { CircleUserRound } from 'lucide-react';

import { useState, useRef, useEffect } from 'react';
import { logout } from '../../../../store/slices/authSlice';
import { RootState } from '../../../../store/store';

export default function UserAvatar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const customer = useSelector((state: RootState) => state.auth.customer);

  const username =
    customer?.username ||
    customer?.firstName ||
    (customer?.email ? customer.email.split('@')[0] : '') ||
    '';

  const initials = username ? username.slice(0, 2).toUpperCase() : 'US';

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth');
    router.refresh();
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!customer) {
    return (
      <Link href="/auth" aria-label="Login">
        <CircleUserRound className="w-7 h-7 text-gray-800 hover:text-[#e7000b] transition-colors" />
      </Link>
    );
  }



  return (
    <div className="relative " ref={menuRef}>
      <button
        onClick={toggleMenu}
        aria-haspopup="true"
        aria-expanded={menuOpen}
        className="flex items-center space-x-2 bg-white px-2 py-1 rounded-full shadow border border-gray-200 hover:shadow-md cursor-pointer transition-all"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-red-500 text-white flex items-center justify-center font-bold text-sm uppercase">
          {initials}
        </div>
        <span className="hidden md:inline text-gray-800 font-medium text-sm">{username}</span>
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fade-in">
          <button
            onClick={handleLogout}
            aria-label="Logout"
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
