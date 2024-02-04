import { createSlice } from "@reduxjs/toolkit";

const confirmDeleteModalSlice = createSlice({
  name: "confirmDeleteModal",
  initialState: {
    showModal: false,
  },
  reducers: {
    setModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { setModal } = confirmDeleteModalSlice.actions;

export default confirmDeleteModalSlice.reducer;
