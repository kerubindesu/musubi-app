import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import aboutReducer from '../features/about/aboutSlice';
import usersReducer from '../features/users/usersSlice';
import postsReducer from '../features/posts/postsSlice';
import bannersReducer from '../features/banners/bannersSlice';
import confirmDeleteModalReducer from '../features/confirmDeleteModal/confirmDeleteModalSlice';
import imagePreviewReducer from '../features/imagePreview/imagePreviewSlice';
import navbarReducer from '../features/navbar/navbarSlice';
import sidebarReducer from '../features/sidebar/sidebarSlice';
import menusReducer from '../features/menus/menusSlice';
import notificationReducer from '../features/notification/notificationSlice'
import logoReducer from '../features/logo/logoSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    about: aboutReducer,
    users: usersReducer,
    navbar: navbarReducer,
    sidebar: sidebarReducer,
    menus: menusReducer,
    notification: notificationReducer,
    logo: logoReducer,
    posts: postsReducer,
    banners: bannersReducer,
    confirmDeleteModal: confirmDeleteModalReducer,
    imagePreview: imagePreviewReducer,

  },
});

export default store;
