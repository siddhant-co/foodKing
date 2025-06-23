"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BannerItem {
  id: number;
  heading: string;
  subheading: string;
  subheading2?: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  isActive: boolean;
}

interface BannerProps {
  banners: BannerItem[];
}

const Banner: React.FC<BannerProps> = ({ banners }) => {
  if (!banners || banners.length === 0) return null;

  const banner = banners[1]; // Use the first active banner

  return (
    <section className="relative w-full h-[80vh] overflow-hidden ">
      <Image
        src={banner.imageUrl}
        alt={banner.heading}
        fill
        style={{ objectFit: "cover" }}
        priority
        className="z-0"
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold">{banner.heading}</h1>
        <p className="mt-2 text-xl md:text-2xl">{banner.subheading}</p>
        {banner.subheading2 && (
          <p className="mb-6 text-lg md:text-xl">{banner.subheading2}</p>
        )}
        <Link
          href={"/shop"}
          className="inline-block bg-white text-black px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition"
        >
          {banner.buttonText}
        </Link>
      </div>
    </section>
  );
};

export default Banner;
