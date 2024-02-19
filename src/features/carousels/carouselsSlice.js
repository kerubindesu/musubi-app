import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/api';
import { showNotification } from '../notification/notificationSlice';
import axios from 'axios';

export const getCarousels = createAsyncThunk(
  'carousels/getCarousels',
  async({ search, limit, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3500/carousels?search=${search}&page=${page}&limit=${limit}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCarousel = createAsyncThunk(
  'carousels/getCarousel',
  async({ id, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3500/carousels/${ id }`);

      return response.data;
    } catch (error) {
      if  (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data).payload.message }))
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createCarousel = createAsyncThunk(
  'carousels/createCarousel',
  async({ title, text, file, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', text);
      formData.append('file', file);

      const response = await axiosPrivate.post('http://localhost:3500/carousels', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }));
        navigate("/dash/carousels")
      }

      return response.data;
    } catch (error) {
      if  (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data).payload.message }))
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCarousel = createAsyncThunk(
  'carousels/updateCarousel',
  async({ id, title, text, file, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', text);
      formData.append('file', file);

      const response = await axiosPrivate.patch(`http://localhost:3500/carousels/${ id }`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }));
        navigate("/dash/carousels")
      }

      return response.data;
    } catch (error) {
      if  (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data).payload.message }))
      }
      
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCarousel = createAsyncThunk(
  "carousels/deleteCarousel",
  async({ id, search, page, limit, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(`
      http://localhost:3500/carousels/${ id }`);

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }));

        dispatch(getCarousels({ search, page, limit }));
      }

      return response.data;
    } catch (error) {
      if  (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data).payload.message }))
      }
      
      return rejectWithValue(error.response.data);
    }
  }
);

const carouselSlice = createSlice({
  name: 'carousels',
  initialState: {
    carousels: [],
    carousel: "",
    totalRows: 0,
    totalPage: 0,
    loading: false,
    error: null,
    noFoundCarousel: ""
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getCarousels.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getCarousels.fulfilled, (state, action) => {
      state.carousels = action.payload.result;
      state.noFoundCarousel = action.payload.message;
      state.totalRows = action.payload.totalRows;
      state.totalPage = action.payload.totalPage;
      state.loading = false;
      state.error = null;

    });

    builder.addCase(getCarousels.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getCarousel.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getCarousel.fulfilled, (state, action) => {
      state.carousel = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getCarousel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createCarousel.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createCarousel.fulfilled, (state, action) => {
      state.carousel = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(createCarousel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateCarousel.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateCarousel.fulfilled, (state, action) => {
      state.carousel = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(updateCarousel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteCarousel.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteCarousel.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteCarousel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default carouselSlice.reducer;
