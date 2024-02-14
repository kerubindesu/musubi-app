import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/api';

export const getMenus = createAsyncThunk(
  'menus/getMenus',
  async({ search, limit, page }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`http://localhost:3500/menus?search=${search}&page=${page}&limit=${limit}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMenu = createAsyncThunk(
  'menus/getMenu',
  async(id, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(`http://localhost:3500/menus/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createMenu = createAsyncThunk(
  'menus/createMenu',
  async({ name, link, icon, navigate }, { rejectWithValue }) => {
    try {

      const response = await axiosPrivate.post('http://localhost:3500/menus', { name, link, icon }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        navigate("/dash/menus")
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateMenu = createAsyncThunk(
  'menus/updateMenu',
  async({ id, name, link, icon, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.patch(`http://localhost:3500/menus/${id}`, { name, link, icon }, {
        withCredentials: true
      });

      if (response) {
        navigate("/dash/menus")
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteMenu = createAsyncThunk(
  "menus/deleteMenu",
  async(id, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(`
      http://localhost:3500/menus/${id}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const menuSlice = createSlice({
  name: 'menus',
  initialState: {
    menus: [],
    totalRows: 0,
    totalPage: 0,
    loading: false,
    error: null,
    noFoundMenu: ""
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getMenus.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getMenus.fulfilled, (state, action) => {
      state.menus = action.payload.result;
      state.noFoundMenu = action.payload.message;
      state.totalRows = action.payload.totalRows;
      state.totalPage = action.payload.totalPage;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getMenus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(getMenu.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(getMenu.fulfilled, (state, action) => {
      state.menu = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(getMenu.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(createMenu.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createMenu.fulfilled, (state, action) => {
      state.menu = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(createMenu.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateMenu.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateMenu.fulfilled, (state, action) => {
      state.menu = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(updateMenu.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(deleteMenu.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteMenu.fulfilled, (state, action) => {
      state.loading = false;
    });

    builder.addCase(deleteMenu.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default menuSlice.reducer;
