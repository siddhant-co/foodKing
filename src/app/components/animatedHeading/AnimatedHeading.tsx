'use client';

import { motion } from 'framer-motion';

export default function AnimatedHeading({ text }: { text: string }) {
  return (
    <motion.h1
      className="text-3xl font-bold text-center mb-10 text-orange-600 tracking-wide relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <span className="relative inline-block">
        <span className="absolute inset-0 bg-red-300 opacity-30 blur-md rounded-xl"></span>
        <span className="relative z-10">{text}</span>
      </span>
    </motion.h1>
  );
}