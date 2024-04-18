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

export const getProductsByCategory = createAsyncThunk(
  'categories/getProductsByCategory',
  async({ id, search, page, limit, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3500/categories/products${ id }?search=${search}&page=${page}&limit=${limit}`);

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
  async({ name, description, file, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
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
  async({ id, name, description, file, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
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
    isLoading: false,
    isCategoryLoading: false,
    error: null,
    products: [],
    isProductsLoading: false,
    noFoundProduct: "",
    totalRowsProducts: 0,
    totalProductsPage: 0,
    errProducts: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload.result;
      state.noFoundCategory = action.payload.message;
      state.totalRows = action.payload.totalRows;
      state.totalPage = action.payload.totalPage;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
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

    builder.addCase(getProductsByCategory.pending, (state) => {
      state.isProductsLoading = true;
      state.error = null;
    });

    builder.addCase(getProductsByCategory.fulfilled, (state, action) => {
      state.products = action.payload.result;
      state.noFoundProduct = action.payload.message;
      state.totalRowsProducts = action.payload.totalRows;
      state.totalProductsPage = action.payload.totalPage;
      state.isProductsLoading = false;
      state.errProducts = null;
    });

    builder.addCase(getProductsByCategory.rejected, (state, action) => {
      state.isProductsLoading = false;
      state.error = action.payload;
    });

    builder.addCase(createCategory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.category = action.payload;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(createCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(updateCategory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.category = action.payload;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(updateCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteCategory.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default categorieslice.reducer;
