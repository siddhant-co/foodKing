// // store/slices/wishlistSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface WishlistItem {
//   variantId: number | null;
//   id: number;
//   title: string;
//   price: number;
//   image: string;
// }

// interface WishlistState {
//   items: WishlistItem[];
// }

// const initialState: WishlistState = {
//   items: [],
// };

// const wishlistSlice = createSlice({
//   name: 'wishlist',
//   initialState,
//   reducers: {
//     addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
//       const exists = state.items.find(item => item.id === action.payload.id);
//       if (!exists) state.items.push(action.payload);
//     },
//     removeFromWishlist: (state, action: PayloadAction<number>) => {
//       state.items = state.items.filter(item => item.id !== action.payload);
//     },
//   },
// });

// export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
// export default wishlistSlice.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/product";


interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find((item: { id: any; }) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item: { id: number; }) => item.id !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
