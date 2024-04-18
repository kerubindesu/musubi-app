import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedTemplate } from '../components/templates';
import { Dashboard } from '../pages';
import NotFound from '../pages/NotFound';
import { useSelector } from 'react-redux';
import { Users } from '../features/users/pages';
import { AddProduct, EditProduct, Products } from '../features/products/pages';
import { LogoConfiguration } from '../features/logo/pages';
import { AddMenu, EditMenu, Menus } from '../features/menus/pages';
import { Carousels, EditCarousel } from '../features/carousels/pages';
import { Contact, AddContact, EditContact } from '../features/contact/pages';
import { Categories, DetailCategory, EditCategory } from '../features/categories/pages';
import { AddTag, EditTag, Tags } from '../features/tags/pages';
import { AddSEOData, EditSEOData, SEOData } from '../features/seoData/pages';

const AdminRoutes = () => {
  const navigate = useNavigate();

  const { errRefreshToken, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated && errRefreshToken) {
      navigate("/auth/login")
    }
  }, [isAuthenticated, errRefreshToken, navigate]);

  return (
    <Routes>
      <Route path="/*" element={<ProtectedTemplate />} >
        <Route path="home" element={<Dashboard />} />

        <Route path="users">
          <Route index element={<Users />} />
          {/* <Route path=":id" element={<EditUser />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="products">
          <Route index element={<Products />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="carousels">
          <Route index element={<Carousels />} />
          {/* <Route path="add" element={<AddCarousel />} /> */}
          <Route path="edit/:id" element={<EditCarousel />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="logo" element={<LogoConfiguration />} />

        <Route path="contact">
          <Route index element={<Contact />} />
          <Route path="add" element={<AddContact />} />
          <Route path="edit/:id" element={<EditContact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="menus">
          <Route index element={<Menus />} />
          <Route path="add" element={<AddMenu />} />
          <Route path="edit/:id" element={<EditMenu />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="categories">
          <Route index element={<Categories />} />
          {/* <Route path="add" element={<AddCategory />} /> */}
          <Route path="edit/:id" element={<EditCategory />} />
          <Route path="view/:id" element={<DetailCategory />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="tags">
          <Route index element={<Tags />} />
          <Route path="add" element={<AddTag />} />
          <Route path="edit/:id" element={<EditTag />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="seo-management">
          <Route index element={<SEOData />} />
          <Route path="add" element={<AddSEOData />} />
          <Route path="edit/:id" element={<EditSEOData />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
