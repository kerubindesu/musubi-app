import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/api';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async({ search, limit, page }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`http://localhost:3500/posts?search=${search}&page=${page}&limit=${limit}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async({ user, tittle, text, file }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post('http://localhost:3500/posts', {
        user,
        tittle,
        text,
        file,
      }, {
        withCredentials: true
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async(id, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(`
      http://localhost:3500/posts/${id}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
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
