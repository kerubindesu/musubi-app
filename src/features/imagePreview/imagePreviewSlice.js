import { createSlice } from "@reduxjs/toolkit";

const imagePreviewSlice = createSlice({
  name: "imagePreview",
  initialState: {
    imgProperties: [],
    imagePreview: false,
  },
  reducers: {
    setImagePreview: (state, action) => {
      state.imagePreview = action.payload;
    },
    setimgProperties: (state, action) => {
      state.imgProperties = action.payload;
    }
  },
});

export const { setImagePreview, setimgProperties } = imagePreviewSlice.actions;

export default imagePreviewSlice.reducer;
