'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';

import { Trash2, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import { addAddress, deleteAddress, fetchAddresses, updateAddress } from '../function/function';
import { RootState } from '../../../store/store';

import Image from 'next/image';

// Address Type
type Address = {
  id?: number;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  type: 'SHIPPING' | 'BILLING';
  isDefault?: boolean;
};

export default function CheckoutPage() {
  const token = useSelector((state: RootState) => state.auth.token);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [shippingId, setShippingId] = useState<number | null>(null);
  const [billingId, setBillingId] = useState<number | null>(null);
  const [sameAsShipping, setSameAsShipping] = useState<boolean>(false);
  const [formState, setFormState] = useState<Address>({
    fullName: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    type: 'SHIPPING',
    isDefault: false,
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Calculate Subtotal, Discount, and Final Total
  const subtotal = cartItems.reduce((acc, item) => acc + item.basePrice * item.quantity, 0);
  const discountThreshold = 500;
  const discountRate = 0.1;
  // const discount = subtotal >= discountThreshold ? subtotal * discountRate : 0;
  const discount = subtotal >= discountThreshold 
  ? Math.round(subtotal * discountRate * 100) / 100 
  : 0;

  const finalTotal = subtotal - discount;

  useEffect(() => {
    const loadAddresses = async () => {
      try {
        if (!token) return;
        const data = await fetchAddresses(token);
        setAddresses(data);
      } catch (err) {
        console.error('Failed to fetch addresses:', err);
      }
    };
    loadAddresses();
  }, [token]);

  const handleSaveAddress = async () => {
    if (!formState.fullName || !formState.phone || !formState.addressLine || !formState.city || !formState.state || !formState.pincode) {
      alert('Please fill in all required fields');
      return;
    }
    try {
      if (editingId) {
        const updated = await updateAddress(token ?? '', editingId, formState);
        setAddresses((prev) => prev.map((addr) => (addr.id === editingId ? updated : addr)));
      } else {
        const newAddr = await addAddress(token ?? '', formState);
        setAddresses((prev) => [...prev, newAddr]);
      }
      setFormState({ fullName: '', phone: '', addressLine: '', city: '', state: '', pincode: '', landmark: '', type: 'SHIPPING', isDefault: false });
      setEditingId(null);
    } catch (err) {
      console.error('Error saving address:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAddress(token ?? '', id);
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      if (shippingId === id) setShippingId(null);
      if (billingId === id) setBillingId(null);
    } catch (err) {
      console.error('Error deleting address:', err);
    }
  };

  const handlePlaceOrder = async () => {
    if (!token) {
      toast.error('Please login to place order');
      return;
    }

    if (!shippingId) {
      toast.error('Please select a shipping address');
      return;
    }

    const orderBody = {
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.basePrice,
      })),
      addressId: shippingId,
      totalAmount: finalTotal,
      paymentMethod: 'RAZORPAY',
      subtotal: subtotal,
      discountAmount :discount

    };

    console.log('Sending order payload:', orderBody);

    try {
      const response = await fetch('https://ecom-testing.up.railway.app/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(orderBody),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Error placing order:', data);
        throw new Error(data.message || 'Failed to create order');
      }

      localStorage.setItem('recentOrderId', data.id.toString());
      toast.success('Order placed successfully');
      console.log('Order placed:', data);
      router.push(`/order-success?id=${data.id}`);
    } catch (error) {
      let message = 'Something went wrong';
    
      if (error instanceof Error) {
        message = error.message;
      }
    
      toast.error(message);
      console.error('Order error:', error);
    }
  };

  const selectedShipping = addresses.find((addr) => addr.id === shippingId);

  return (
    <div className=" p-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
    
        




        <div className="bg-white shadow-md p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-[#e7000b]">{editingId ? 'Edit Address' : 'Add Address'}</h2>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <input type="text" placeholder="Full Name" className="w-full p-2 border rounded-md border-gray-300 " value={formState.fullName} onChange={(e) => setFormState({ ...formState, fullName: e.target.value })} />
             <input type="text" placeholder="Phone" className="w-full p-2 border rounded-md border-gray-300 " value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} />
             <input type="text" placeholder="Address Line" className="w-full p-2 border rounded-md md:col-span-2 border-gray-300 " value={formState.addressLine} onChange={(e) => setFormState({ ...formState, addressLine: e.target.value })} />
             <input type="text" placeholder="City" className="w-full p-2 border rounded-md border-gray-300 " value={formState.city} onChange={(e) => setFormState({ ...formState, city: e.target.value })} />
             <input type="text" placeholder="State" className="w-full p-2 border rounded-md border-gray-300 " value={formState.state} onChange={(e) => setFormState({ ...formState, state: e.target.value })} />
             <input type="text" placeholder="Pincode" className="w-full p-2 border rounded-md border-gray-300 " value={formState.pincode} onChange={(e) => setFormState({ ...formState, pincode: e.target.value })} />
             <input type="text" placeholder="Landmark (optional)" className="w-full p-2 border rounded-md md:col-span-2 border-gray-300 " value={formState.landmark || ''} onChange={(e) => setFormState({ ...formState, landmark: e.target.value })} />
             <select className="w-full p-2 border rounded-md border-gray-300 " value={formState.type} onChange={(e) => setFormState({ ...formState, type: e.target.value as 'SHIPPING' | 'BILLING' })}>
               <option value="SHIPPING">Shipping</option>
               <option value="BILLING">Billing</option>
             </select>
             <label className="flex items-center gap-2 mt-2 border-gray-300 ">
               <input type="checkbox" checked={formState.isDefault || false} onChange={(e) => setFormState({ ...formState, isDefault: e.target.checked })} />
               Set as default
             </label>
           </div>

           <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" onClick={handleSaveAddress}>
             {editingId ? 'Update' : 'Add'} Address
           </button>
         </div>

         <div className="grid md:grid-cols-2 gap-4">
          {['SHIPPING', 'BILLING'].map((type) => {
            const isShipping = type === 'SHIPPING';
            const selectedId = isShipping ? shippingId : billingId;
            const setSelected = isShipping ? setShippingId : setBillingId;
            return (
              <div key={type} className="bg-white shadow-md p-4 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">{type} Address</h3>
                  {type === 'BILLING' && (
                    <label className="text-sm flex items-center gap-2">
                      <input type="checkbox" checked={sameAsShipping} onChange={(e) => setSameAsShipping(e.target.checked)} />
                      Same as shipping
                    </label>
                  )}
                </div>
                <div className="space-y-3">
                  {(type === 'BILLING' && sameAsShipping && selectedShipping) ? (
                    <div className="bg-green-50 border border-green-500 p-3 rounded">
                      <p className="font-bold">{selectedShipping.fullName}</p>
                      <p className="text-sm">{selectedShipping.addressLine}, {selectedShipping.city}, {selectedShipping.state} - {selectedShipping.pincode}</p>
                      <p className="text-sm">Phone: {selectedShipping.phone}</p>
                    </div>
                  ) : addresses.filter(a => a.type === type).length === 0 ? (
                    <p className="text-gray-500">No {type.toLowerCase()} addresses available.</p>
                  ) : addresses.filter((a) => a.type === type).map((addr) => (
                    <div
                      key={addr.id}
                      className={`border p-3 rounded ${selectedId === addr.id ? 'border-green-500 bg-green-50' : 'border-gray-300'} cursor-pointer`}
                      onClick={() => {
                        if (type === 'BILLING' && sameAsShipping) return;
                        setSelected(addr.id!);
                      }}
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="font-bold">{addr.fullName}</p>
                          <p className="text-sm">{addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}</p>
                          <p className="text-sm">Phone: {addr.phone}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormState({
                                ...addr,
                                landmark: addr.landmark || '',
                                isDefault: addr.isDefault || false,
                              });
                              setEditingId(addr.id!);
                            }}
                          >
                            <Pencil className="w-4 h-4 text-blue-600 cursor-pointer" />
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); handleDelete(addr.id!); }}>
                            <Trash2 className="w-4 h-4 text-red-600 cursor-pointer" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>


        </div>

      <div className="space-y-6">
        <div className="bg-white shadow-lg p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 text-[#e7000b] border-b-2 border-blue-100 pb-2 flex items-center gap-2">
            🛒 <span>Cart Items</span>
          </h2>
          <ul className="space-y-3 max-h-64 overflow-y-auto">
            {cartItems.map((item, i) => (
              <li key={i} className="flex justify-between items-center p-2 bg-white rounded-md border border-gray-300 ">
                <div className="flex items-center gap-4">
                  <Image src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <p className="font-medium text-gray-700">{item.name}</p>
                    <p className="text-gray-500 text-sm">₹{item.basePrice} × {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-green-600">₹{item.basePrice * item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-6 text-[#e7000b] border-b-2 border-indigo-200 pb-2 flex items-center gap-2">
            📦 <span>Order Summary</span>
          </h2>

          <div className="text-sm space-y-2 mb-6 text-gray-700">
            <div className="flex justify-between">
              <span>Total Items:</span>
              <span className="font-medium text-gray-900">{cartItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium text-gray-900">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount:</span>
              <span className="font-medium">- ₹{discount}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-semibold text-lg">Total Price:</span>
              <span className="font-bold text-green-600 text-lg">₹{finalTotal}</span>
            </div>
          </div>

          <button
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
