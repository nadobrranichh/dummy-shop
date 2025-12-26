import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../types";

const initialCartState: { product: Product; quantity: number }[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
      if (itemIndex === -1)
        state.push({ product: action.payload.product, quantity: 1 });
      else state[itemIndex].quantity++;
    },
    removeFromCart(state, action) {
      const itemIndex = state.findIndex(
        (item) => item.product.id === action.payload.id
      );
      if (itemIndex === -1) return;
      if (state[itemIndex].quantity === 1) state.splice(itemIndex, 1);
      else state[itemIndex].quantity--;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
