'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function RestaurantIntro() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-5 bg-[#ffffff]">
      {/* Left: Chef Image */}
      <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <Image
          src="/chef.jpg" 
          alt="Chef"
          width={550}
          height={500}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Right: Text Content */}
      <div className="w-full md:w-1/2  ">
        <p className="text-sm text-red-600 tracking-widest font-semibold uppercase mb-2">
          Welcome At <span className="inline-block ml-1">🍴</span>
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          FOODKING 
        </h1>
        <p className="text-gray-600 text-base leading-relaxed mb-6">
          Codulgence diminution so discovered mr apartments. Are off under folly death
          wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do
          am or limits hearts. Resolve parties but why she shewing. She sang know now.
        </p>
        <Link href="/shop">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-sm font-semibold transition">
            Explore Menu
          </button>
        </Link>
      </div>
    </div>
  );
}
