import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isSidebarOpen: false,
    theme: "light",
  },
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openSidebar(state) {
      state.isSidebarOpen = true;
    },
    closeSidebar(state) {
      state.isSidebarOpen = false;
    },
    toggleTheme(state) {
      document.body.classList.toggle("dark");
      if (state.theme === "light") {
        state.theme = "dark";
      } else state.theme = "light";
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
