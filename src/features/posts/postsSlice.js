import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/api';
import { showNotification } from '../notification/notificationSlice';
import axios from 'axios';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async({ search, limit, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3500/posts?search=${search}&page=${page}&limit=${limit}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPost = createAsyncThunk(
  'posts/getPost',
  async({ id, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3500/posts/${id}`);

      return response.data;
    } catch (error) {
      if  (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data).payload.message }))
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async({ user, title, text, file, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('username', user);
      formData.append('title', title);
      formData.append('text', text);
      formData.append('file', file);

      const response = await axiosPrivate.post('http://localhost:3500/posts', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: 'success' }));

        navigate("/dash/posts")
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

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async({ id, title, text, file, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('text', text);
      formData.append('file', file);

      const response = await axiosPrivate.patch(`http://localhost:3500/posts/${id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: 'success' }));
        
        navigate("/dash/posts")
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

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async({ id, search, page, limit, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(`
      http://localhost:3500/posts/${id}`);

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: 'success' }));

        dispatch(getPosts({ search, page, limit }));
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

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    post: "",
    totalRows: 0,
    totalPage: 0,
    loading: false,
    error: null,
    noFoundPost: ""
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload.result;
      state.noFoundPost = action.payload.message;
      state.totalRows = action.payload.totalRows;
      state.totalPage = action.payload.totalPage;
      state.loading = false;
      state.error = null;

    });

    builder.addCase(getPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getPost.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updatePost.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(updatePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default postSlice.reducer;
