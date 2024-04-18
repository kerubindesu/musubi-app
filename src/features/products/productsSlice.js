import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/api';
import { showNotification } from '../notification/notificationSlice';
import axios from 'axios';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async({ search, limit, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3500/products?search=${search}&page=${page}&limit=${limit}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductBySlug = createAsyncThunk(
  'products/getProductBySlug',
  async({ slug }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3500/products/slug/${ slug }`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProduct = createAsyncThunk(
  'products/getProduct',
  async({ id, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3500/products/${ id }`);

      return response.data;
    } catch (error) {
      if  (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data).payload.message }))
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async({ title, description, file, user, category, tags, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('username', user);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', file);
      formData.append('category', category);
      tags.forEach(tag => {
        formData.append('tags[]', tag); // Jika tags adalah array, tambahkan [] di akhir
      });

      const response = await axiosPrivate.post('http://localhost:3500/products', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }));

        navigate("/dash/products")
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

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async({ id, title, description, file, category, tags, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file', file);
      formData.append('category', category);
      tags.forEach(tag => {
        formData.append('tags[]', tag); // Jika tags adalah array, tambahkan [] di akhir
      });

      const response = await axiosPrivate.patch(`http://localhost:3500/products/${ id }`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }));
        
        navigate("/dash/products")
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

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async({ id, search, page, limit, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(`
      http://localhost:3500/products/${ id }`);

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }));

        dispatch(getProducts({ search, page, limit }));
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

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    productBySlug: "",
    product: "",
    totalRows: 0,
    totalPage: 0,
    isLoading: false,
    isProductBySlugLoading: false,
    error: null,
    isProductBySlugError: null,
    noFoundProduct: "",
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.result;
      state.noFoundProduct = action.payload.message;
      state.totalRows = action.payload.totalRows;
      state.totalPage = action.payload.totalPage;
      state.isLoading = false;
      state.error = null;

    });

    builder.addCase(getProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getProductBySlug.pending, (state) => {
      state.isProductBySlugLoading = true;
      state.isProductBySlugError = null;
    });

    builder.addCase(getProductBySlug.fulfilled, (state, action) => {
      state.productBySlug = action.payload;
      state.isProductBySlugLoading = false;
      state.isProductBySlugError = null;
    });

    builder.addCase(getProductBySlug.rejected, (state, action) => {
      state.isProductBySlugLoading = false;
      state.isProductBySlugError = action.payload;
    });

    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(getProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;
