import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/api';
import axios from 'axios';
import { showNotification } from '../notification/notificationSlice';

// export const createLogo = createAsyncThunk(
//   'logo/createLogo',
//   async({ file, dispatch }, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await axiosPrivate.post('http://localhost:3500/logo', formData, {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       if (response) {
//         dispatch(getLogo())
//       }

//       return response.data;
//     } catch (error) {
//       if  (error) {
//         dispatch(showNotification({ message: rejectWithValue(error.response.data).payload.message }))
//       }

//      return rejectWithValue(error.response.data);
//     }
//   }
// );

export const getLogo = createAsyncThunk(
  'logo/getLogo',
  async(_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3500/logo",
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
  'logo/updateLogo',
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
        dispatch(showNotification({ message: response.data.message, type: "success" }))

        dispatch(getLogo())
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

const logoSlice = createSlice({
  name: 'logo',
  initialState: {
    logo: "",
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    // builder.addCase(createLogo.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });

    // builder.addCase(createLogo.fulfilled, (state, action) => {
    //   state.logo = action.payload;
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

export default logoSlice.reducer;
