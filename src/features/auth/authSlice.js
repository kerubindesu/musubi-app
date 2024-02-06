import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async({ name, username, email, password, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3500/users', {
        name,
        username,
        email,
        password,
      }, {
        withCredentials: true
      });

      navigate("/auth/login");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async({ username, password, navigate }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3500/auth/login', {
        username,
        password,
      }, {
        withCredentials: true
      });

      dispatch((async() => {
        await dispatch(refreshAccessToken()); // menunggu pembaruan token
        navigate("/dash");
      })());

      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async(_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3500/auth/token', {
        withCredentials: true,
      });

      return response.data.accessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      console.clear()
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserAuth = createAsyncThunk(
  'auth/user', async() => {
    try {
      const response = await axios.get('http://localhost:3500/auth/user', {
        withCredentials: true,
      });

      return response.data.user;
    } catch (error) {
      console.log(error)
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async(navigate, { rejectWithValue }) => {
  try {
    await axios.delete('http://localhost:3500/auth/logout', {
      withCredentials: true
    });

    navigate("/auth/login")

    return null;
  } catch (error) {
    
    return rejectWithValue(error.response.data);
  }
});

export const selectAccessToken = (state) => state.auth.accessToken;

const initialState = {
  userAuth: '',
  isAuthenticated: false,
  accessToken: '',
  loading: false,
  error: null,
  errRefreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.accessToken = '';
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {

    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.accessToken = '';
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.accessToken = '';
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(refreshAccessToken.pending, (state) => {
      state.loading = true;
      state.errRefreshToken = null;
    });

    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.errRefreshToken = null;
    });

    builder.addCase(refreshAccessToken.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.accessToken = '';
      state.loading = false;
      state.errRefreshToken = action.payload;
    });

    builder.addCase(getUserAuth.fulfilled, (state, action) => {
      state.userAuth = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.userAuth = '';
      state.isAuthenticated = false;
      state.accessToken = '';
      state.loading = false;
      state.error = null;
    });

    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logoutSuccess } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;
export default authSlice.reducer;
