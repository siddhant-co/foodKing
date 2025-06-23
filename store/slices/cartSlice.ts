import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number; 
  productId: number;
  name: string;
  basePrice: number;
  quantity: number;
  variantId: number;
  image: string;
  product: any;
  price: any;
  item_id: number;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
}

const discountThreshold = 500;
const discountRate = 0.1;

const initialState: CartState = {
  items: [],
  subtotal: 0,
  discount: 0,
  total: 0,
};

// 👉 Reusable function to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((acc, item) => acc + item.basePrice * item.quantity, 0);
  const discount = subtotal >= discountThreshold ? subtotal * discountRate : 0;
  const total = subtotal - discount;

  return { subtotal, discount, total };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      const totals = calculateTotals(state.items);
      state.subtotal = totals.subtotal;
      state.discount = totals.discount;
      state.total = totals.total;
    },
    // removeFromCartState: (state, action: PayloadAction<number>) => {
    //   state.items = state.items.filter(item => item.id !== action.payload);
    //   const totals = calculateTotals(state.items);
    //   state.subtotal = totals.subtotal;
    //   state.discount = totals.discount;
    //   state.total = totals.total;
    // },


    // removeFromCartState: (
    //   state,
    //   action: PayloadAction<{ productId: number; variantId: number }>
    // ) => {
    //   const { productId, variantId } = action.payload;
    
    //   state.items = state.items.filter(
    //     item => !(item.productId === productId && item.variantId === variantId)
    //   );
    
    //   const totals = calculateTotals(state.items);
    //   state.subtotal = totals.subtotal;
    //   state.discount = totals.discount;
    //   state.total = totals.total;
    // },


//     removeFromCartState: (
//       state,
//       action: PayloadAction<{ productId: number; variantId?: number | null }>
//     ) => {
//       const { productId, variantId } = action.payload;
    
//       state.items = state.items.filter(item => {
//         const isSameProduct = item.productId === productId;
    
//         const isSameVariant =
//           variantId === undefined || variantId === null
//             ? item.variantId === undefined || item.variantId === null
//             : item.variantId === variantId;
    
//         return !(isSameProduct && isSameVariant);
//       });
    
//       const totals = calculateTotals(state.items);
//       state.subtotal = totals.subtotal;
//       state.discount = totals.discount;
//       state.total = totals.total;
//       console.log("Before:", state.items);
// console.log("Removing productId:", productId, "variantId:", variantId);

    //     },
    


    removeFromCartState: (
      state,
      action: PayloadAction<{ productId: number; variantId: number | null }>
    ) => {
      const { productId, variantId } = action.payload;
    
      state.items = state.items.filter(item => {
        const sameProduct = item.productId === productId;
        const sameVariant =
          variantId === null
            ? item.variantId === null || item.variantId === undefined
            : item.variantId === variantId;
    
        return !(sameProduct && sameVariant);
      });
    
      const totals = calculateTotals(state.items);
      state.subtotal = totals.subtotal;
      state.discount = totals.discount;
      state.total = totals.total;
    }
    ,
    

    
    clearCartState: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.discount = 0;
      state.total = 0;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { productId, variantId, quantity } = action.payload;
      const existingItem = state.items.find(
        item => item.productId === productId && item.variantId === variantId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push(action.payload);
      }

      const totals = calculateTotals(state.items);
      state.subtotal = totals.subtotal;
      state.discount = totals.discount;
      state.total = totals.total;
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item && quantity >= 1) {
        item.quantity = quantity;
      }

      const totals = calculateTotals(state.items);
      state.subtotal = totals.subtotal;
      state.discount = totals.discount;
      state.total = totals.total;
    },
  },
});

export const {
  setCartItems,
  removeFromCartState,
  clearCartState,
  addToCart,
  updateCartItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
