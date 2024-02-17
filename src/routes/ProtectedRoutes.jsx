import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedTemplate } from '../components/templates';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import { useSelector } from 'react-redux';
import { Users } from '../features/users/pages';
import { AddPost, EditPost, Posts } from '../features/posts/pages';
import { LogoConfiguration } from '../features/logo/pages';
import { AddMenu, EditMenu, Menus } from '../features/menus/pages';
import { Carousels, EditCarousel } from '../features/carousels/pages';
import { About, AddAbout, EditAbout } from '../features/about/pages';
import { AddCategory, Categories, EditCategory } from '../features/categories/pages';
import { AddTag, EditTag, Tags } from '../features/tags/pages';

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
        </Route>

        <Route path="posts">
          <Route index element={<Posts />} />
          <Route path="add" element={<AddPost />} />
          <Route path=":id" element={<EditPost />} />
        </Route>

        <Route path="carousels">
          <Route index element={<Carousels />} />
          {/* <Route path="add" element={<AddCarousel />} /> */}
          <Route path=":id" element={<EditCarousel />} />
        </Route>

        <Route path="logo" element={<LogoConfiguration />} />

        <Route path="about">
          <Route index element={<About />} />
          <Route path="add" element={<AddAbout />} />
          <Route path=":id" element={<EditAbout />} />
        </Route>

        <Route path="menus">
          <Route index element={<Menus />} />
          <Route path="add" element={<AddMenu />} />
          <Route path=":id" element={<EditMenu />} />
        </Route>

        <Route path="categories">
          <Route index element={<Categories />} />
          <Route path="add" element={<AddCategory />} />
          <Route path=":id" element={<EditCategory />} />
        </Route>

        <Route path="tags">
          <Route index element={<Tags />} />
          <Route path="add" element={<AddTag />} />
          <Route path=":id" element={<EditTag />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
