

'use client';

import { useState } from 'react';
import Image from 'next/image';
import ProductCard from '../productCard.tsx/ProductCard';
import { Product } from '../../../../types/product';
import { Subcategory } from '../../../../types/category';
import { addToCart } from '../../../../store/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import toast from 'react-hot-toast';
import { addToCartApi } from '@/app/function/function';
import { Minus, Plus, Heart } from 'lucide-react';
import { addToWishlist, removeFromWishlist } from '../../../../store/slices/wishlistSlice';

interface ProductDetailsProps {
  product: Product;
  subcategory: Subcategory;
}

export default function ProductDetails({ product, subcategory }: ProductDetailsProps) {
  const [selectedVariant, setSelectedVariant] = useState<Product['variants'][0] | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const token = useSelector((state: RootState) => state.auth.token);
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  const currentImage = selectedVariant?.images?.[0]?.url || product.imageUrl || '/placeholder.jpg';
  const currentPrice = selectedVariant?.price || product.basePrice;

  const relatedProducts =
    subcategory?.products?.filter((p: { id: number }) => p.id !== product.id) || [];

  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Added to wishlist');
    }
  };

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
          quantity: quantity,
          variantId: selectedVariant?.id ?? null,
        },
        token
      );

      dispatch(
        addToCart({
          id: res.id,
          productId: product.id,
          name: selectedVariant ? `${product.name} - ${selectedVariant.name}` : product.name,
          basePrice: selectedVariant?.price ?? product.basePrice,
          quantity: quantity,
          product: undefined,
          image: selectedVariant?.images?.[0]?.url ?? product.imageUrl,
          price: selectedVariant?.price ?? product.basePrice,
         variantId: selectedVariant?.id ?? 0,
          item_id: res.id,
        })
      );

      toast.success("Added to cart!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to add to cart");
      } else {
        toast.error("Failed to add to cart");
      }
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Product Details */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image */}
        <div className="flex-1">
          <Image
            src={currentImage}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg object-cover w-full h-[550px]"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
     
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-rose-600 via-red-500 to-pink-500 text-transparent bg-clip-text drop-shadow-sm">
  {product.name}
</h1>

          <p className="text-lg mb-2 text-gray-600">{product.description}</p>

          <div className="flex gap-4 items-center mb-2">
            {product.oldPrice && (
              <span className="text-gray-500 line-through text-xl">
                ₹{product.oldPrice}
              </span>
            )}
            <span className="text-3xl font-bold text-[#ff8c00]">₹{currentPrice}</span>
          </div>

          {/* Variants */}
          {product.variants?.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Select Variant:</h3>
              <div className="flex gap-4 flex-wrap">
                {product.variants.map((variant: Product['variants'][0]) => (
                  <div
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`cursor-pointer border-2 rounded-lg p-1 w-24 h-28 flex flex-col items-center justify-center transition ${
                      selectedVariant?.id === variant.id
                        ? 'border-[#e7000b]'
                        : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={variant.images?.[0]?.url || product.imageUrl}
                      alt={variant.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-20 overflow-hidden "
                    />
                    <p className="text-center text-xs mt-1 bg-gradient-to-r from-rose-600 via-red-500 to-pink-500 text-transparent bg-clip-text drop-shadow-sm">{variant.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mt-3 mb-4">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              disabled={quantity <= 1}
              className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4 text-gray-700" />
            </button>

            <span className="text-lg font-semibold text-gray-800 w-6 text-center">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full transition"
            >
              <Plus className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
            >
              Add to Cart
            </button>

            {/* Wishlist Button */}
       {/* Wishlist Button */}
<button
  onClick={handleWishlistToggle}
  className={`flex items-center gap-2 px-5 py-2  border transition-all duration-300 
    ${isInWishlist ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-300 hover:border-red-400 hover:bg-red-50 text-gray-800'}
  `}
>
  <Heart
    size={18}
    className={`transition-all duration-300 ${
      isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-500 group-hover:text-red-500'
    }`}
    fill={isInWishlist ? 'red' : 'none'}
  />
  <span className="text-sm font-medium">
    {isInWishlist ? 'Wishlisted' : 'Add to Wishlist'}
  </span>
</button>

          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-5">
        <h2 className="text-2xl font-bold mb-4">
          Products related to {subcategory.name}
        </h2>
        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {relatedProducts.map((item: Product) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No related products found.</p>
        )}
      </div>
    </div>
  );
}

