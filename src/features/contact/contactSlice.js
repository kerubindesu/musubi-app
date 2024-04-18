import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/api';
import { showNotification } from '../notification/notificationSlice';
import axios from 'axios';

export const getContact = createAsyncThunk(
  'contact/getContact',
  async(_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3500/contact");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getWhatsappNumber = createAsyncThunk(
  'contact/getWhatsappNumber',
  async(_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3500/contact/whatsapp-number");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const createContact = createAsyncThunk(
  'contact/createContact',
  async({ companyName, description, file, whatsappNumber, email, address, latitude, longitude, dispatch }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('company_name', companyName);
      formData.append('description', description);
      formData.append('file', file);
      formData.append('whatsapp_number', whatsappNumber);
      formData.append('email', email);
      formData.append('address', address);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);

      const response = await axiosPrivate.post('http://localhost:3500/contact', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }));
      }

      return response.data;
    } catch (error) {
      if  (error) {
        dispatch(showNotification({ message: rejectWithValue(error.response.data).payload.message }))

        dispatch(getContact())
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const updateContact = createAsyncThunk(
  'contact/updateContact',
  async({ id, companyName, description, file, whatsappNumber, email, address, latitude, longitude, dispatch }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('company_name', companyName);
      formData.append('description', description);
      formData.append('file', file);
      formData.append('whatsapp_number', whatsappNumber);
      formData.append('email', email);
      formData.append('address', address);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);

      const response = await axiosPrivate.patch(`http://localhost:3500/contact/${ id }`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }));
        
        dispatch(getContact())
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

export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async({ id, dispatch }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(`
      http://localhost:3500/contact/${ id }`);

      if (response) {
        dispatch(showNotification({ message: response.data.message, type: "success" }));

        dispatch(getContact());
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

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contact: "",
    isLoading: false,
    error: null,
    whatsappNumber: "",
    isWhatsappNumberLoading: false,
    isWhatsappNumberError: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getContact.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(getContact.fulfilled, (state, action) => {
      state.contact = action.payload;
      state.isLoading = false;
      state.error = null;

    });

    builder.addCase(getContact.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(getWhatsappNumber.pending, (state) => {
      state.isWhatsappNumberLoading = true;
      state.isWhatsappNumberError = null;
    });

    builder.addCase(getWhatsappNumber.fulfilled, (state, action) => {
      state.whatsappNumber = action.payload;
      state.isWhatsappNumberLoading = false;
      state.isWhatsappNumberLoading = null;

    });

    builder.addCase(getWhatsappNumber.rejected, (state, action) => {
      state.isWhatsappNumberLoading = false;
      state.isWhatsappNumberLoading = action.payload;
    });

    builder.addCase(createContact.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(createContact.fulfilled, (state, action) => {
      state.contact = action.payload;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(createContact.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(updateContact.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(updateContact.fulfilled, (state, action) => {
      state.contact = action.payload;
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(updateContact.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteContact.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(deleteContact.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default contactSlice.reducer;
