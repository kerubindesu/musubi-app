import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';
import postsReducer from '../features/posts/postsSlice';
import confirmDeleteModalReducer from '../features/confirmDeleteModal/confirmDeleteModalSlice';
import imagePreviewReducer from '../features/imagePreview/imagePreviewSlice';
import navbarReducer from '../features/navbar/navbarSlice';
import settingsReducer from '../features/settings/settingsSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    navbar: navbarReducer,
    settings: settingsReducer,
    posts: postsReducer,
    confirmDeleteModal: confirmDeleteModalReducer,
    imagePreview: imagePreviewReducer,

  },
});

export default store;
