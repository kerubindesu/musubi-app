import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/api';
import { showNotification } from '../notification/notificationSlice';
import axios from 'axios';

export const getTags = createAsyncThunk(
  'tags/getTags',
  async({ search, limit, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3500/tags?search=${search}&page=${page}&limit=${limit}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTag = createAsyncThunk(
  'tags/getTag',
  async({ id, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3500/tags/${id}`);

      return response.data;
    } catch (error) {
      if  (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data).payload.message }))
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createTag = createAsyncThunk(
  'tags/createTag',
  async({ name, dispatch, navigate }, { rejectWithValue }) => {
    try {

      const response = await axiosPrivate.post('http://localhost:3500/tags', { name }, {
        withCredentials: true
      });

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }))

        navigate("/dash/tags")
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

export const updateTag = createAsyncThunk(
  'tags/updateTag',
  async({ id, name, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.patch(`http://localhost:3500/tags/${id}`, { name }, {
        withCredentials: true
      });

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }))

        navigate("/dash/tags")
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

export const deleteTag = createAsyncThunk(
  "tags/deleteTag",
  async({ id, search, page, limit, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(`
      http://localhost:3500/tags/${id}`);

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }))

        dispatch(getTags({ search, page, limit }))
      }

      return response.data;
    } catch (error) {
      if  (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data).payload.message }))
      }

      return rejectWithValue(error.response.data.message);
    }
  }
);

const tagSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: [],
    totalRows: 0,
    totalPage: 0,
    loading: false,
    error: null,
    noFoundTag: ""
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getTags.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getTags.fulfilled, (state, action) => {
      state.tags = action.payload.result;
      state.noFoundTag = action.payload.message;
      state.totalRows = action.payload.totalRows;
      state.totalPage = action.payload.totalPage;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getTags.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getTag.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getTag.fulfilled, (state, action) => {
      state.tag = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getTag.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createTag.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createTag.fulfilled, (state, action) => {
      state.tag = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(createTag.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateTag.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateTag.fulfilled, (state, action) => {
      state.tag = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(updateTag.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteTag.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteTag.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteTag.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default tagSlice.reducer;
