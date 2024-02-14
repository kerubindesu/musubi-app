import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';
import postsReducer from '../features/posts/postsSlice';
import confirmDeleteModalReducer from '../features/confirmDeleteModal/confirmDeleteModalSlice';
import imagePreviewReducer from '../features/imagePreview/imagePreviewSlice';
import navbarReducer from '../features/navbar/navbarSlice';
import menusReducer from '../features/menus/menusSlice';
import logoReducer from '../features/logo/logoSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    navbar: navbarReducer,
    menus: menusReducer,
    logo: logoReducer,
    posts: postsReducer,
    confirmDeleteModal: confirmDeleteModalReducer,
    imagePreview: imagePreviewReducer,

  },
});

export default store;
