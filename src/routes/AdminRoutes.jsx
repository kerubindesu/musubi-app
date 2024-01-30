import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AdminTemplate } from '../components/templates';
import AdminDashboard from '../pages/admin/AdminDashboard';
import NotFound from '../pages/NotFound';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth/authSlice';

const AdminRoutes = () => {
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login")
    }
  }, [isAuthenticated, navigate]);

  return (
    <Routes>
      <Route path="/*" element={<AdminTemplate />} >
        <Route index element={<AdminDashboard />} />

        {/* <Route path="users">
          <Route index element={<UsersList />} />
          <Route path="new" element={<NewUserForm />} />
          <Route path=":id" element={<EditUser />} />
        </Route>

        <Route path="posts">
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
