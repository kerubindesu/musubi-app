import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/api';
import { showNotification } from '../notification/notificationSlice';
import axios from 'axios';

export const getBanners = createAsyncThunk(
  'banners/getBanners',
  async({ search, limit, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3500/banners?search=${search}&page=${page}&limit=${limit}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBanner = createAsyncThunk(
  'banners/getBanner',
  async({ id, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3500/banners/${id}`);

      return response.data;
    } catch (error) {
      if  (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data).payload.message }))
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createBanner = createAsyncThunk(
  'banners/createBanner',
  async({ title, text, file, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', text);
      formData.append('file', file);

      const response = await axiosPrivate.post('http://localhost:3500/banners', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: 'success' }));
        navigate("/dash/banners")
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

export const updateBanner = createAsyncThunk(
  'banners/updateBanner',
  async({ id, title, text, file, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', text);
      formData.append('file', file);

      const response = await axiosPrivate.patch(`http://localhost:3500/banners/${id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: 'success' }));
        navigate("/dash/banners")
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

export const deleteBanner = createAsyncThunk(
  "banners/deleteBanner",
  async({ id, search, page, limit, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(`
      http://localhost:3500/banners/${id}`);

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: 'success' }));

        dispatch(getBanners({ search, page, limit }));
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

const bannerSlice = createSlice({
  name: 'banners',
  initialState: {
    banners: [],
    banner: "",
    totalRows: 0,
    totalPage: 0,
    loading: false,
    error: null,
    noFoundBanner: ""
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getBanners.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getBanners.fulfilled, (state, action) => {
      state.banners = action.payload.result;
      state.noFoundBanner = action.payload.message;
      state.totalRows = action.payload.totalRows;
      state.totalPage = action.payload.totalPage;
      state.loading = false;
      state.error = null;

    });

    builder.addCase(getBanners.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getBanner.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getBanner.fulfilled, (state, action) => {
      state.banner = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getBanner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createBanner.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createBanner.fulfilled, (state, action) => {
      state.banner = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(createBanner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateBanner.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateBanner.fulfilled, (state, action) => {
      state.banner = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(updateBanner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteBanner.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteBanner.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteBanner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default bannerSlice.reducer;
