import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';
import confirmDeleteModalReducer from '../features/confirmDeleteModal/confirmDeleteModalSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    confirmDeleteModal: confirmDeleteModalReducer,
  },
});

export default store;
