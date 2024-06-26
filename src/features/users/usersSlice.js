import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/api';
import { showNotification } from '../notification/notificationSlice';
import { getUserAuth } from '../auth/authSlice';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async({ search, limit, page }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`http://localhost:3500/users?search=${search}&page=${page}&limit=${limit}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async({ id, name, username, email, password, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.patch(`http://localhost:3500/users/${ id }`, { name, username, email, password }, {
        withCredentials: true,
      });

      if (response) {
        dispatch(getUserAuth());
        dispatch(showNotification({ message: response.data.message, type: "success" }));
      }

      return response.data;
    } catch (error) {
      if (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data.message).payload.message }));
      }

      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async({ id, search, limit, page, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(`
      http://localhost:3500/users/${ id }`);

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }));
        dispatch(getUsers({ search, page, limit }));
      }

      return response.data;
    } catch (error) {
      if (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data.message).payload.message }));
      }

      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    totalRows: 0,
    totalPage: 0,
    isLoading: false,
    isUpdateUserLoading: false,
    error: null,
    isUpdateUserError: null,
    noFoundUser: ""
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload.result;
      state.noFoundUser = action.payload.message;
      state.totalRows = action.payload.totalRows;
      state.totalPage = action.payload.totalPage;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.isUpdateUserLoading = true;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isUpdateUserLoading = false;
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.isUpdateUserLoading = false;
      state.isUpdateUserError = action.payload;
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
