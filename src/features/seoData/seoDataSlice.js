import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/api';
import { showNotification } from '../notification/notificationSlice';
import axios from 'axios';

export const getAllSEOData = createAsyncThunk(
  'seoData/getAllSEOData',
  async({ search, limit, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3500/seo-management?search=${search}&page=${page}&limit=${limit}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSEODataById = createAsyncThunk(
  'seoData/getSEODataById',
  async({ id, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3500/seo-management/${ id }`);

      return response.data;
    } catch (error) {
      if  (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data).payload.message }))
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createSEOData = createAsyncThunk(
  'seoData/createSEOData',
  async({ keyword, description, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post('http://localhost:3500/seo-management', { keyword, description }, {
        withCredentials: true,
      });

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }));

        navigate("/dash/seo-management")
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

export const updateSEOData = createAsyncThunk(
  'seoData/updateSEOData',
  async({ id, keyword, description, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.patch(`http://localhost:3500/seo-management/${ id }`, { keyword, description }, {
        withCredentials: true,
      });

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }));
        
        navigate("/dash/seoData")
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

export const deleteSEOData = createAsyncThunk(
  "seoData/deleteSEOData",
  async({ id, search, page, limit, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(`
      http://localhost:3500/seo-management/${ id }`);

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }));

        dispatch(getAllSEOData({ search, page, limit }));
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

const seoDatalice = createSlice({
  name: "seoData",
  initialState: {
    seoData: [],
    seoDataById: "",
    totalRows: 0,
    totalPage: 0,
    isLoading: false,
    error: null,
    noFoundSEOData: ""
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSEOData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(getAllSEOData.fulfilled, (state, action) => {
      state.seoData = action.payload.result;
      state.noFoundSEOData = action.payload.message;
      state.totalRows = action.payload.totalRows;
      state.totalPage = action.payload.totalPage;
      state.isLoading = false;
      state.error = null;

    });

    builder.addCase(getAllSEOData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getSEODataById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(getSEODataById.fulfilled, (state, action) => {
      state.seoDataById = action.payload;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(getSEODataById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(createSEOData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(createSEOData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(createSEOData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(updateSEOData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(updateSEOData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(updateSEOData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteSEOData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteSEOData.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(deleteSEOData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default seoDatalice.reducer;
