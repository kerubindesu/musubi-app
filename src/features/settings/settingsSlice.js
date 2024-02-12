import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/api';

export const getSetting = createAsyncThunk(
  'settings/getSetting',
  async({ rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get("http://localhost:3500/config");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSetting = createAsyncThunk(
  'settings/updateSetting',
  async({ theme, primary, secondary, background, text, file, description, siteName, siteDescription, keywords, emailServer, port, username, password, senderEmail, navigate }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append('theme', theme);
      formData.append('color_palette.primary', primary);
      formData.append('color_palette.secondary', secondary);
      formData.append('color_palette.background', background);
      formData.append('color_palette.text', text);
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
        navigate("/dash/settings")
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
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getSetting.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getSetting.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getSetting.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateSetting.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateSetting.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(updateSetting.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default settingslice.reducer;
