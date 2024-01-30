// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/api';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async ({ q, limit }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get("http://localhost:3500/users", {
        params: { q, limit },
      });

    //   console.log(response.data)

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    totalItems: 0,
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload.data;
      state.totalItems = action.payload.totalItems;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// ... (fungsi-fungsi reducer lainnya)

export default userSlice.reducer;
