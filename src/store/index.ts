import { configureStore } from "@reduxjs/toolkit";
import selectedCategoriesSlice from "./selected-categories-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    selectedCategories: selectedCategoriesSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
