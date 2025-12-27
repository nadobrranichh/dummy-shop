import { createSlice } from "@reduxjs/toolkit";

const initialSelectedCategories: string[] = [];

const selectedCategoriesSlice = createSlice({
  name: "categories",
  initialState: initialSelectedCategories,
  reducers: {
    addCategory(state, action) {
      state.push(action.payload);
    },
    removeCategory(state, action) {
      return state.filter((category) => category !== action.payload);
    },
  },
});

export const selectedCategoriesActions = selectedCategoriesSlice.actions;
export default selectedCategoriesSlice;
