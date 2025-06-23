

"use client";

import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "../../../../types/product";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "../../../../store/store";
import { addToCart} from "../../../../store/slices/cartSlice";
import { addToCartApi } from "@/app/function/function";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../../store/slices/wishlistSlice";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  const selectedVariant = product.productVariants?.[0] || null;
  const displayPrice = product.basePrice;
  const displayImage = product.imageUrl;
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!token) {
      toast.error("You must be logged in to add items to the cart.");
      return;
    }

    try {
      const res = await addToCartApi(
        {
          productId: product.id,
          quantity: 1,
          variantId: selectedVariant?.id ?? null,
        },
        token
      );

      dispatch(
        addToCart({
          id: res.id, // id returned by backend
          productId: product.id, // local use
          name: product.name,
          basePrice: displayPrice,
          quantity: 1,
          product: undefined,
          image: displayImage,
          price: displayPrice,
          variantId: selectedVariant?.id ?? null,
          item_id: res.id, // backend cart item ID
        })
      );

      toast.success("Added to cart!");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to add to cart';
    
      toast.error(errorMessage);
      console.error(error);
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success("Removed from wishlist");
    } else {
 
      dispatch(addToWishlist(product));

      toast.success("Added to wishlist");
    }
  };

  return (
    <Link href={`/singleProduct/${product.slug}`} className="w-full">
      <div className="relative bg-white rounded p-2 shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-xs mx-auto">
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleWishlistToggle();
          }}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:text-red-500 h-9 w-9 flex items-center justify-center z-10"
        >
          <Heart
            size={20}
            strokeWidth={1.5}
            fill={isInWishlist ? "red" : "none"}
            color={isInWishlist ? "red" : "black"}
          />
        </button>

        {/* Product Image */}
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={250}
          height={200}
          className="rounded object-cover w-full h-50"
        />

        {/* Tags / Icons */}
   {/* Variants Display */}
   {/* {product.variants && product.variants.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-3">
    {product.variants.map((variant: { images: { id: Key | null | undefined; url: string | StaticImport; }[]; name: string; }) =>
      variant.images?.map((image: { id: Key | null | undefined; url: string | StaticImport; }) => (
        <div key={image.id} className="w-8 h-8 rounded overflow-hidden border">
          <Image
            src={image.url}
            alt={variant.name}
            width={32}
            height={32}
            className="object-cover w-full h-full"
          />
        </div>
      ))
    )}
  </div>
)} */}

        {/* Product Name */}
        <h2 className="text-lg font-bold mt-3 text-start bg-gradient-to-r from-rose-600 via-red-500 to-pink-500 text-transparent bg-clip-text drop-shadow-sm ">{product.name}</h2>

            {/* Description */}
            <p className="text-xs text-start text-gray-600  px-1">
          {product.description?.split(" ").slice(0, 8).join(" ") || ""}...
        </p>


        <div className="flex justify-between mt-2 px-2">
          
        
          <div className="flex gap-0.5 items-center justify-center">
          {product.oldPrice && (
  <div className="text-start text-gray-400 line-through text-md font-bold mt-1">
    ₹{product.oldPrice}
  </div>
)}
          <div className="text-start text-[#ff8c00] text-lg font-bold mt-1">
          ₹{displayPrice}
        </div>
          </div>

          
    
        <button
          className=" w-25 h-9 flex justify-center items-center gap-2 bg-[#e7000b]  text-white py-2 rounded text-xs font-medium transition-all"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={16} /> Add to Cart
        </button>

        </div>

    

  
      </div>
    </Link>
  );
}
