import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    navBurgerMenu: false,
    navOption: false,
  },
  reducers: {
    setNavBurgerMenu: (state, action) => {
      state.navBurgerMenu = action.payload;
    },
  },
});

export const { setNavBurgerMenu } = navbarSlice.actions;

export default navbarSlice.reducer;
