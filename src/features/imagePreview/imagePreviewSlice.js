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
    setImgProperties: (state, action) => {
      state.imgProperties = action.payload;
    }
  },
});

export const { setImagePreview, setImgProperties } = imagePreviewSlice.actions;

export default imagePreviewSlice.reducer;
