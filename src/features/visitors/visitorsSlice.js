import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/api';


export const getVisitsData = createAsyncThunk(
  'visitors/getVisitsData',
  async (dateRange, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`http://localhost:3500/visitors?startDate=${dateRange.start}&endDate=${dateRange.end}`);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const visitorsSlice = createSlice({
  name: 'visitors',
  initialState: {
    visitsData: [],
    isLoading: false,
    isError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVisitsData.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });

    builder.addCase(getVisitsData.fulfilled, (state, action) => {
      state.visitsData = action.payload;
      state.isLoading = false;

    });

    builder.addCase(getVisitsData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload || 'Something went wrong';
    });
  },
});

export default visitorsSlice.reducer;