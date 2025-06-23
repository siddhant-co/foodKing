'use client';

import { useState } from 'react';


import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen flex justify-center">
      {/* Left Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full">
          {/* Toggle Buttons */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowLogin(true)}
              className={`px-4 py-2 rounded-l cursor-pointer ${
                showLogin ? 'bg-[#fb4b02] text-white' : 'bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className={`px-4 py-2 rounded-r cursor-pointer ${
                !showLogin ? 'bg-[#fb4b02] text-white' : 'bg-gray-200'
              }`}
            >
              Register
            </button>
          </div>

          {/* Animated Form Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={showLogin ? 'login' : 'register'}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              {showLogin ? <LoginForm /> : <RegisterForm />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right Banner Section */}
      <div className="w-full md:w-1/2 relative h-64 md:h-auto">
        <Image
          src="/login_banner.webp"
          alt="Login Banner"
          layout="fill"
          objectFit="cover"
          className="hidden md:block"
        />
      </div>
    </div>
  );
}
