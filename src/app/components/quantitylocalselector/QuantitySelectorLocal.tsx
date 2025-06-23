// components/product/QuantitySelectorLocal.tsx
'use client';

import { Dispatch, SetStateAction } from 'react';

interface QuantitySelectorLocalProps {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

export default function QuantitySelectorLocal({ quantity, setQuantity }: QuantitySelectorLocalProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
        className="px-3 py-1 text-lg border rounded bg-gray-100 hover:bg-gray-200"
      >
        -
      </button>
      <span className="px-4 py-1 border rounded">{quantity}</span>
      <button
        onClick={() => setQuantity(prev => prev + 1)}
        className="px-3 py-1 text-lg border rounded bg-gray-100 hover:bg-gray-200"
      >
        +
      </button>
    </div>
  );
}
