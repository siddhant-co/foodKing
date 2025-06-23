// components/cart/QuantitySelector.tsx
'use client';

import { useDispatch } from 'react-redux';
import { updateCartItemQuantity } from '../../../../store/slices/cartSlice';


interface QuantitySelectorProps {
  itemId: number;         // ID from CartItem (not productId)
  quantity: number;       // Current quantity
}

export default function QuantitySelector({ itemId, quantity }: QuantitySelectorProps) {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(updateCartItemQuantity({ id: itemId, quantity: quantity + 1 }));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(updateCartItemQuantity({ id: itemId, quantity: quantity - 1 }));
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDecrement}
        className="px-3 py-1 text-lg border rounded bg-gray-100 hover:bg-gray-200"
      >
        -
      </button>
      <span className="px-4 py-1 border rounded">{quantity}</span>
      <button
        onClick={handleIncrement}
        className="px-3 py-1 text-lg border rounded bg-gray-100 hover:bg-gray-200"
      >
        +
      </button>
    </div>
  );
}
