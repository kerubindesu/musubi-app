import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showNotification } from '../notification/notificationSlice';
import { axiosPrivate } from '../../utils/api';

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async({ name, username, email, password, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3500/users', {
        name,
        username,
        email,
        password,
      }, {
        withCredentials: true
      });

      if (response) {
        // Kirim email verifikasi
        await dispatch(verifyEmail(email));

        dispatch(showNotification({ message: response.data.message, type: "success" }));
        navigate("/auth/login");
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

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3500/auth/verify-email?token=${token}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to verify email' });
    }
  }
);

export const requestNewEmailToken = createAsyncThunk(
  'auth/requestNewEmailToken',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3500/auth/request-new-email-token', { email });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendResetPasswordToken = createAsyncThunk(
  'auth/sendResetPasswordToken',
  async ({ email, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3500/auth/send-reset-password-token', { email });

      if  (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }))
      }

      return true;
    } catch (error) {
      if  (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data).payload.message }))
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password, dispatch, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:3500/auth/reset-password/${token}`, { password });

      if  (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }))
      }

      navigate("/auth/login")

      return true;
    } catch (error) {
      if  (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data).payload.message }))
      }

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
        
        dispatch(showNotification({ message: response.data.message, type: "success" }))

        navigate("/dash/home");
      })());

      return response.data
    } catch (error) {
      if  (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data).payload.message }))
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async(_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3500/auth/token', {
        withCredentials: true,
      });

      return response.data.accessToken;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserAuth = createAsyncThunk(
  'auth/user', async(_, {rejectWithValue}) => {
    try {
      const response = await axiosPrivate.get('http://localhost:3500/auth/user',
      {
        withCredentials: true,
      });

      return response.data.user;
    } catch (error) {
      console.error('Error checking login status')
      return rejectWithValue(error.response.data);
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

const initialState = {
  userAuth: '',
  isAuthenticated: false,
  accessToken: '',
  isEmailSent: false,
  isLoading: false,
  error: null,
  errRefreshToken: null,

  // Verify Email
  verifyEmailStatus: 'idle',
  isVerifyEmailError: false,

  // Request New Email Token
  requestNewEmailTokenStatus: 'idle',
  isRequestNewEmailTokenError: false,

  // Send Reset Password Token
  sendResetPasswordTokenStatus: 'idle',
  isSendResetPasswordTokenError: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.accessToken = '';
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(verifyEmail.pending, (state) => {
      state.verifyEmailStatus = 'loading';
      state.isVerifyEmailError = null;
    });

    builder.addCase(verifyEmail.fulfilled, (state) => {
      state.verifyEmailStatus = 'succeeded';
      state.isVerifyEmailError = null;
    });

    builder.addCase(verifyEmail.rejected, (state, action) => {
      state.verifyEmailStatus = 'failed';
      state.isVerifyEmailError = action.payload.message;
    });

    builder.addCase(requestNewEmailToken.pending, (state) => {
      state.requestNewEmailTokenStatus = 'loading';
      state.isRequestNewEmailTokenError = null;
    });

    builder.addCase(requestNewEmailToken.fulfilled, (state) => {
      state.requestNewEmailTokenStatus = 'succeeded';
      state.isRequestNewEmailTokenError = null;
    });

    builder.addCase(requestNewEmailToken.rejected, (state, action) => {
      state.requestNewEmailTokenStatus = 'failed';
      state.isRequestNewEmailTokenError = action.payload.message;
    });

    builder.addCase(sendResetPasswordToken.pending, (state) => {
      state.sendResetPasswordTokenStatus = "loading";
      state.isSendResetPasswordTokenError = null;
    });

    builder.addCase(sendResetPasswordToken.fulfilled, (state, action) => {
      state.sendResetPasswordTokenStatus = 'succeeded';
      state.isSendResetPasswordTokenError = null;
    });

    builder.addCase(sendResetPasswordToken.rejected, (state, action) => {
      state.sendResetPasswordTokenStatus = 'failed';
      state.isSendResetPasswordTokenError = action.payload.message;
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.accessToken = '';
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(refreshAccessToken.pending, (state) => {
      state.isLoading = true;
      state.errRefreshToken = null;
    });

    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.errRefreshToken = null;
    });

    builder.addCase(refreshAccessToken.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.accessToken = '';
      state.isLoading = false;
      state.errRefreshToken = action.payload;
    });

    builder.addCase(getUserAuth.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUserAuth.fulfilled, (state, action) => {
      state.userAuth = action.payload;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(getUserAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.userAuth = '';
      state.isAuthenticated = false;
      state.accessToken = '';
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectLoading = (state) => state.auth.isLoading;
export default authSlice.reducer;
