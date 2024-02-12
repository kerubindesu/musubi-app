import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';
import postsReducer from '../features/posts/postsSlice';
import confirmDeleteModalReducer from '../features/confirmDeleteModal/confirmDeleteModalSlice';
import imagePreviewReducer from '../features/imagePreview/imagePreviewSlice';
import navbarReducer from '../features/navbar/navbarSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    navbar: navbarReducer,
    posts: postsReducer,
    confirmDeleteModal: confirmDeleteModalReducer,
    imagePreview: imagePreviewReducer,

  },
});

export default store;
