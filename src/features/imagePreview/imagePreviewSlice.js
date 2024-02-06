import { createSlice } from "@reduxjs/toolkit";

const imagePreviewSlice = createSlice({
  name: "imagePreview",
  initialState: {
    imageURL: [],
    imagePreview: false,
  },
  reducers: {
    setImagePreview: (state, action) => {
      state.imagePreview = action.payload;
    },
    setImageURL: (state, action) => {
      state.imageURL = action.payload;
    }
  },
});

export const { setImagePreview, setImageURL } = imagePreviewSlice.actions;

export default imagePreviewSlice.reducer;
