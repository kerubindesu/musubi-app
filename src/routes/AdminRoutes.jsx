import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AdminTemplate } from '../components/templates';
import AdminDashboard from '../pages/admin/AdminDashboard';
import NotFound from '../pages/NotFound';
import { useSelector } from 'react-redux';
import { Users } from '../features/users/pages';
import { AddPost, EditPost, Posts } from '../features/posts/pages';
import { LogoSettings } from '../features/logo/pages';
import { AddMenu, EditMenu, Menus } from '../features/menus/pages';

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
      <Route path="/*" element={<AdminTemplate />} >
        <Route index element={<AdminDashboard />} />

        <Route path="users">
          <Route index element={<Users />} />
          {/* <Route path=":id" element={<EditUser />} /> */}
        </Route>

        <Route path="menus">
          <Route index element={<Menus />} />
          <Route path="add" element={<AddMenu />} />
          <Route path=":id" element={<EditMenu />} />
        </Route>

        <Route path="posts">
          <Route index element={<Posts />} />
          <Route path="add" element={<AddPost />} />
          <Route path=":id" element={<EditPost />} />
        </Route>

        <Route path="settings">
          {/* <Route index element={<Settings />} /> */}
          <Route path="logo" element={<LogoSettings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
