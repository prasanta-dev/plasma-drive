import { createSlice } from "@reduxjs/toolkit";

// ✅ Load persisted cart on app start
const loadCart = () => {
  try {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// ✅ Save to localStorage after every change
const saveCart = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart()   // ✅ hydrates from localStorage on refresh
  },
  reducers: {
    addToCart: (state, action) => {
      const exists = state.items.some(i => i.$id === action.payload.$id);
      if (!exists) {
        state.items.push(action.payload);
        saveCart(state.items);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.$id !== action.payload);
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;