import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/api';
import { showNotification } from '../notification/notificationSlice';
import axios from 'axios';

export const getAbout = createAsyncThunk(
  'about/getAbout',
  async(_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3500/about");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createAbout = createAsyncThunk(
  'about/createAbout',
  async({ title, text, file, maps, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', text);
      formData.append('file', file);
      formData.append('maps', maps);

      const response = await axiosPrivate.post('http://localhost:3500/about', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: 'success' }));
      }

      return response.data;
    } catch (error) {
      if  (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data).payload.message }))

        dispatch(getAbout())
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAbout = createAsyncThunk(
  'about/updateAbout',
  async({ id, title, text, file, maps, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', text);
      formData.append('file', file);
      formData.append('maps', maps);

      const response = await axiosPrivate.patch(`http://localhost:3500/about/${id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: 'success' }));
        
        dispatch(getAbout())
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

export const deleteAbout = createAsyncThunk(
  "about/deleteAbout",
  async({ id, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(`
      http://localhost:3500/about/${id}`);

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: 'success' }));

        dispatch(getAbout());
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

const aboutSlice = createSlice({
  name: 'about',
  initialState: {
    about: "",
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getAbout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getAbout.fulfilled, (state, action) => {
      state.about = action.payload;
      state.loading = false;
      state.error = null;

    });

    builder.addCase(getAbout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createAbout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createAbout.fulfilled, (state, action) => {
      state.about = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(createAbout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateAbout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateAbout.fulfilled, (state, action) => {
      state.about = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(updateAbout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteAbout.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteAbout.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteAbout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default aboutSlice.reducer;
