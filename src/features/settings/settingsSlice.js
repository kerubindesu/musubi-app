import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/api';

export const getSettings = createAsyncThunk(
  'settings/getSettings',
  async(_, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get("http://localhost:3500/config",
      {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async({ theme, primary, secondary, background, text, file, description, siteName, siteDescription, keywords, emailServer, port, username, password, senderEmail, navigate }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append('theme', theme);
      formData.append('primary', primary);
      formData.append('secondary', secondary);
      formData.append('background', background);
      formData.append('text', text);
      formData.append('file', file);
      formData.append('description', description);
      formData.append('site_name', siteName);
      formData.append('site_description', siteDescription);
      formData.append('keywords', keywords);
      formData.append('email_server', emailServer);
      formData.append('port', port);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('sender_email', senderEmail);

      const response = await axiosPrivate.patch("http://localhost:3500/config", formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        navigate(window.location.pathname)
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const createLogo = createAsyncThunk(
//   'settings/createLogo',
//   async({ file }, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await axiosPrivate.post('http://localhost:3500/logo', formData, {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const getLogo = createAsyncThunk(
  'settings/getLogo',
  async(_, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get("http://localhost:3500/logo",
      {
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateLogo = createAsyncThunk(
  'settings/updateLogo',
  async({ file, dispatch }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosPrivate.patch(`http://localhost:3500/logo/`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        dispatch(getLogo())
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const settingslice = createSlice({
  name: 'settings',
  initialState: {
    settings: [],
    logo: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getSettings.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getSettings.fulfilled, (state, action) => {
      state.settings = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getSettings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateSettings.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateSettings.fulfilled, (state, action) => {
      state.settings = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(updateSettings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // builder.addCase(createLogo.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });

    // builder.addCase(createLogo.fulfilled, (state, action) => {
    //   state.settings = action.payload;
    //   state.loading = false;
    //   state.error = null;
    // });

    // builder.addCase(createLogo.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });

    builder.addCase(getLogo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getLogo.fulfilled, (state, action) => {
      state.logo = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getLogo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateLogo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateLogo.fulfilled, (state, action) => {
      state.logo = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(updateLogo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default settingslice.reducer;
