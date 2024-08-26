import { createSlice } from '@reduxjs/toolkit';

// Initial state with item structure including buyerCount
const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, quantity, buyerCount } = action.payload;
      const item = state.find(item => item.id === id);
      if (item) {
        // Update quantity and buyer count if the item already exists
        item.quantity = quantity;
        item.buyerCount = (item.buyerCount || 0) + buyerCount;
      } else {
        // Add new item with initial buyer count
        state.push({ id, name, price, quantity, buyerCount });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;