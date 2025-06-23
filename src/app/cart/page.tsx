'use client';
// use client

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Minus, Plus, X } from 'lucide-react';

import { RootState } from '../../../store/store';
import {
  clearCartState,
  removeFromCartState,
  setCartItems,
  updateCartItemQuantity,
} from '../../../store/slices/cartSlice';
import {
  fetchCartItems,
  deleteCartItem,
  clearCart,
} from '../function/function';
import { Product } from '../../../types/product';

const fallbackImage = '/placeholder.png';
const ITEMS_PER_PAGE = 5;
const discountThreshold = 500;
const discountRate = 0.1;

interface CartItem {
  id: number;
  productId: number;
  variantId: number | null;
  name: string;
  basePrice: number;
  quantity: number;
  image: string;
  product: Product;
  price: number;
  subcategory?: string;
}

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const token = useSelector((state: RootState) => state.auth.token);
  const cartItems = useSelector((state: RootState) => state.cart.items || []);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.basePrice * item.quantity, 0),
    [cartItems]
  );

  const discount = subtotal >= discountThreshold ? subtotal * discountRate : 0;
  const total = subtotal - discount;
  const remainingAmount = discountThreshold - subtotal;
  const progress = Math.min((subtotal / discountThreshold) * 100, 100);

  const totalPages = Math.ceil(cartItems.length / ITEMS_PER_PAGE);
  const paginatedItems = cartItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
      const loadCart = async () => {
        if (!token) return;
        try {
          const data = await fetchCartItems(token);
          if (Array.isArray(data.items)) {
            const normalizedItems = data.items.map((item: CartItem) => ({
              id: item.id,
              productId: item.product?.id,
              variantId: item.variantId ?? null,
              name: item.product?.name || 'Unnamed Product',
              basePrice: item.product?.productVariants?.[0]?.basePrice || 0,
              quantity: item.quantity,
              image: item.product?.productVariants?.[0]?.images || fallbackImage,
              product: item.product,
              price: item.product?.productVariants?.[0]?.basePrice || 0,
              subcategory: item.product?.subcategory?.name || 'Unknown Subcategory',
            }));
            dispatch(setCartItems(normalizedItems));
          }
        } catch (error) {
          console.error('Error loading cart:', error);
        } finally {
          setIsLoading(false);
        }
      };

    if (token && cartItems.length === 0) {
      loadCart();
    } else {
      setIsLoading(false);
    }
  }, [dispatch, token, cartItems.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [cartItems.length]);

  const handleRemove = async (item: CartItem) => {
    try {
      await deleteCartItem(item.id, token ?? '');
      dispatch(
        removeFromCartState({
          productId: item.productId,
          variantId: item.variantId ?? null,
        })
      );
      toast.success('Item removed from cart');
    } catch (error: unknown) {
      console.error('Error fetching categories:', (error as Error).message);
      toast.error('Failed to remove item');
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart(token ?? '');
      dispatch(clearCartState());
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItemQuantity({ id: itemId, quantity: newQuantity }));
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    router.push('/checkout');
  };

  return (
    <div className="px-4 sm:px-10 mt-5">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 tracking-tight group">
        🛒 Your{' '}
        <span className="text-[#e7000b] group-hover:underline duration-200">Cart</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items Section */}
        <div className="md:col-span-2 space-y-6">
          {isLoading ? (
            <div className="text-center text-gray-500 text-lg animate-pulse">
              Loading your cart...
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-20 text-gray-600 bg-white rounded-lg shadow-sm">
              <div className="text-6xl mb-4 animate-bounce">🛍️</div>
              <h2 className="text-2xl font-bold mb-2">Your cart is feeling a little light</h2>
              <p className="mb-4 text-gray-500">Looks like you haven’t added anything yet.</p>
              <Link
                href="/shop"
                className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition shadow-md"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="hidden sm:grid grid-cols-4 gap-4 px-4 py-2 font-semibold text-gray-700 border-b border-gray-300">
                <h2>Product</h2>
                <h2>Name</h2>
                <h2>Price</h2>
                <h2>Quantity</h2>
              </div>

              {paginatedItems.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId ?? 'no-variant'}`}
                  className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center px-4 py-4 border-b border-gray-200 relative"
                >
                  <div className="flex justify-center sm:justify-start">
                    <Image
                      src={item.image || fallbackImage}
                      alt={item.name}
                      width={100}
                      height={100}
                      unoptimized
                      className="rounded-lg w-[100px] h-[100px] object-cover border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = fallbackImage;
                      }}
                    />
                  </div>

                  <div className="text-center sm:text-left">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800">{item.name}</h2>
                  </div>

                  <div className="text-center sm:text-left">
                    <p className="text-sm text-gray-600">₹{item.basePrice}</p>
                  </div>

                  <div className="flex justify-center sm:justify-start items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-full transition disabled:opacity-40"
                    >
                      <Minus className="w-4 h-4 text-gray-700" />
                    </button>
                    <span className="text-base font-medium text-gray-800 w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-full transition"
                    >
                      <Plus className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemove(item)}
                    className="text-red-500 hover:text-red-600 transition absolute top-2 right-2 p-1"
                    aria-label="Remove item"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}

              <div className="flex justify-center items-center gap-6 mt-6">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
                >
                  ← Previous
                </button>
                <span className="text-gray-600 text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50"
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>

        {/* Order Summary */}
        <div className="border border-gray-100 rounded-2xl p-6 bg-white shadow-xl h-fit sticky top-30">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">🧾 Order Summary</h2>

          {subtotal >= discountThreshold ? (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center font-semibold">
              🎉 Congratulations! You have unlocked a 10% discount!
            </div>
          ) : (
            <div className="bg-yellow-100 text-yellow-700 p-3 rounded-lg mb-4 text-center font-medium">
              You are ₹{remainingAmount.toFixed(2)} away from getting a 10% discount!
            </div>
          )}

          <div className="w-full bg-gray-200 h-2 rounded mb-6">
            <div
              className="bg-green-500 h-2 rounded transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="text-slate-700 mb-2 font-medium">
            Total Items: <span className="font-semibold">{cartItems.length}</span>
          </div>
          <div className="text-slate-700 mb-2 font-medium">
            Subtotal: <span className="text-slate-900 font-bold">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="text-slate-700 mb-2 font-medium">
            Discount: <span className="text-green-600 font-bold">₹{discount.toFixed(2)}</span>
          </div>
          <div className="text-slate-700 mb-6 font-medium">
            Total Price: <span className="text-green-600 font-bold">₹{total.toFixed(2)}</span>
          </div>

          <button
            type="button"
            onClick={handlePlaceOrder}
            className="w-full py-3 px-6 rounded text-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition duration-300 shadow-md"
          >
            🛒 Proceed To Checkout
          </button>

          <button
            type="button"
            onClick={handleClearCart}
            className="w-full mt-4 py-3 px-6 rounded text-lg font-semibold text-white bg-red-500 hover:bg-red-600 transition duration-300 shadow-md"
          >
            🗑️ Clear Cart
          </button>

          <Link href="/shop">
            <button
              type="button"
              className="w-full mt-4 py-3 px-6 rounded text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition duration-300 shadow-md"
            >
              🛍️ Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
