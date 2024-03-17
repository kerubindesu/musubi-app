import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/api';
import { showNotification } from '../notification/notificationSlice';
import axios from 'axios';

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async({ search, limit, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3500/categories?search=${search}&page=${page}&limit=${limit}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategory = createAsyncThunk(
  'categories/getCategory',
  async({ id, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3500/categories/${ id }`);

      return response.data;
    } catch (error) {
      if  (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data).payload.message }))
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const getPostsByCategory = createAsyncThunk(
  'categories/getPostsByCategory',
  async({ id, search, page, limit, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3500/categories/posts${ id }?search=${search}&page=${page}&limit=${limit}`);

      return response.data;
    } catch (error) {
      if  (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data).payload.message }))
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async({ name, text, file, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('text', text);
      formData.append('file', file);

      const response = await axiosPrivate.post('http://localhost:3500/categories', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }))

        navigate("/dash/categories")
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

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async({ id, name, text, file, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('text', text);
      formData.append('file', file);

      const response = await axiosPrivate.patch(`http://localhost:3500/categories/${ id }`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }))

        navigate("/dash/categories")
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

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async({ id, search, page, limit, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(`
      http://localhost:3500/categories/${ id }`);

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }))

        dispatch(getCategories({ search, page, limit }))
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

const categorieslice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    noFoundCategory: "",
    totalRows: 0,
    totalPage: 0,
    loading: false,
    isCategoryLoading: false,
    error: null,
    posts: [],
    isPostsLoading: false,
    noFoundPost: "",
    totalRowsPosts: 0,
    totalPostsPage: 0,
    errPosts: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload.result;
      state.noFoundCategory = action.payload.message;
      state.totalRows = action.payload.totalRows;
      state.totalPage = action.payload.totalPage;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getCategory.pending, (state) => {
      state.isCategoryLoading = true;
      state.error = null;
    });

    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.category = action.payload;
      state.isCategoryLoading = false;
      state.error = null;
    });

    builder.addCase(getCategory.rejected, (state, action) => {
      state.isCategoryLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getPostsByCategory.pending, (state) => {
      state.isPostsLoading = true;
      state.error = null;
    });

    builder.addCase(getPostsByCategory.fulfilled, (state, action) => {
      state.posts = action.payload.result;
      state.noFoundPost = action.payload.message;
      state.totalRowsPosts = action.payload.totalRows;
      state.totalPostsPage = action.payload.totalPage;
      state.isPostsLoading = false;
      state.errPosts = null;
    });

    builder.addCase(getPostsByCategory.rejected, (state, action) => {
      state.isPostsLoading = false;
      state.error = action.payload;
    });

    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.category = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.category = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default categorieslice.reducer;
