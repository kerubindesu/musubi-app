import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    sidebar: false,
  },
  reducers: {
    setSidebar: (state, action) => {
      state.sidebar = action.payload;
    },
  },
});

export const { setSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
