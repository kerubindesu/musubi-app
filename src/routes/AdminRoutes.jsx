import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AdminTemplate } from '../components/templates';
import AdminDashboard from '../pages/admin/AdminDashboard';
import NotFound from '../pages/NotFound';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth/authSlice';
import Users from '../features/users/pages/Users';

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
          {/* <Route path="new" element={<NewUserForm />} />
          <Route path=":id" element={<EditUser />} /> */}
        </Route>

        {/* <Route path="posts">
          <Route index element={<PostsList />} />
          <Route path="new" element={<NewPost />} />
          <Route path=":id" element={<EditPost />} />
        </Route> */}

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
