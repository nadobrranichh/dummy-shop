import { configureStore } from "@reduxjs/toolkit";
import selectedCategoriesSlice from "./selected-categories-slice";

const store = configureStore({
  reducer: {
    selectedCategories: selectedCategoriesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
