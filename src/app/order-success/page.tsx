'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Download, ShoppingCart, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface OrderItem {
  id: number;
  name: string;
  image: string;
  unit_price: string;
  quantity: number;
  category: string;
}

interface OrderData {
  id: string;
  items: OrderItem[];
  customer_info: {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    billing_address: string;
    delivery_address: string;
  };
  order_info: {
    sub_total: number;
    final_total: number;
    order_status: string;
    created_at_formatted: string;
    invoice_url: string;
  };
  payment_info: {
    is_payment_done: boolean;
    payment_type: string;
  };
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId || !token) return router.push('/');
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/order/detail/${orderId}`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setOrder(res.data.results?.[0]);
      } catch (err) {
        console.error(err);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, token, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium text-gray-600">
        Loading your order...
      </div>
    );
  }

  if (!order) return null;

  const { items, customer_info, order_info, payment_info } = order;

  return (
    <div className="min-h-screen bg-gray-100 py-5 px-6 md:px-40 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-6xl w-full bg-white rounded-2xl shadow-xl p-8 grid md:grid-cols-2 gap-10"
      >
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-8"
        >
          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
              <div className="max-h-64 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-gray-100">
                {items.map((item, i) => (
                  <div key={i} className="flex justify-between border-b pb-2">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-medium">₹{item.unit_price}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between pt-4 mt-4 border-t font-bold text-lg text-red-600">
                <span>Total</span>
                <span>₹{order_info.sub_total}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Address</h2>
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 space-y-1">
              <p className="font-medium">{customer_info.first_name} {customer_info.last_name}</p>
              <p>{customer_info.phone_number}</p>
              <p>{customer_info.delivery_address}</p>
              <p>{customer_info.email}</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col justify-between"
        >
          {/* Thank You Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5, type: 'spring' }}
            className="bg-gradient-to-r from-red-500 to-red-700 text-white text-center py-8 px-6 rounded-lg shadow-lg mb-8"
          >
            <BadgeCheck className="mx-auto text-white w-12 h-12 mb-4" />
            <h1 className="text-4xl font-bold mb-2">Thank You!</h1>
            <p className="text-lg font-medium">Your order has been placed successfully.</p>
            <p className="mt-2 text-sm opacity-80">{order_info.created_at_formatted}</p>
            <span className={`mt-4 inline-block px-3 py-1 text-sm rounded-full font-semibold 
              ${order_info.order_status === 'Delivered' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {order_info.order_status}
            </span>
          </motion.div>

          {/* Payment Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Info</h2>
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 space-y-2">
              <p><span className="font-medium">Method:</span> {payment_info.payment_type}</p>
              <p>
                <span className="font-medium">Status:</span>{' '}
                <span className={payment_info.is_payment_done ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  {payment_info.is_payment_done ? 'Paid' : 'Pending'}
                </span>
              </p>
            </div>
          </div>

          {/* Invoice Download & CTA */}
          <div className="mt-10 space-y-6 text-center">
            {order_info.invoice_url && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`${process.env.NEXT_PUBLIC_API_URL}${order_info.invoice_url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow"
              >
                <Download className="w-5 h-5" />
                Download Invoice
              </motion.a>
            )}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow"
            >
              <ShoppingCart className="w-5 h-5" />
              Continue Shopping
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}