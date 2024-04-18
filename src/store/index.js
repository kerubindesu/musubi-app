import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import contactReducer from "../features/contact/contactSlice";
import usersReducer from "../features/users/usersSlice";
import productsReducer from "../features/products/productsSlice";
import tagsReducer from "../features/tags/tagsSlice";
import carouselsReducer from "../features/carousels/carouselsSlice";
import confirmDeleteModalReducer from "../features/confirmDeleteModal/confirmDeleteModalSlice";
import imagePreviewReducer from "../features/imagePreview/imagePreviewSlice";
import navbarReducer from "../features/navbar/navbarSlice";
import sidebarReducer from "../features/sidebar/sidebarSlice";
import seoDataReducer from "../features/seoData/seoDataSlice";
import menusReducer from "../features/menus/menusSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import notificationReducer from "../features/notification/notificationSlice";
import logoReducer from "../features/logo/logoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    contact: contactReducer,
    users: usersReducer,
    navbar: navbarReducer,
    sidebar: sidebarReducer,
    menus: menusReducer,
    categories: categoriesReducer,
    notification: notificationReducer,
    logo: logoReducer,
    products: productsReducer,
    tags: tagsReducer,
    carousels: carouselsReducer,
    seoData: seoDataReducer,
    confirmDeleteModal: confirmDeleteModalReducer,
    imagePreview: imagePreviewReducer,

  },
});

export default store;
