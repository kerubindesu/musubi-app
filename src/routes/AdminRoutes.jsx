import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminTemplate } from '../components/templates';
import AdminDashboard from '../pages/admin/AdminDashboard';
import NotFound from '../pages/NotFound';
import UsersList from '../features/users/components/UsersList';
import PostsList from '../features/posts/components/PostsList';
import EditUser from '../features/users/components/EditUser';
import NewUserForm from '../features/users/components/NewUserForm';
import NewPost from '../features/posts/components/NewPost';
import EditPost from '../features/posts/components/EditPost';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<AdminTemplate />} >
        <Route index element={<AdminDashboard />} />

        <Route path="users">
          <Route index element={<UsersList />} />
          <Route path="new" element={<NewUserForm />} />
          <Route path=":id" element={<EditUser />} />
        </Route>

        <Route path="posts">
          <Route index element={<PostsList />} />
          <Route path="new" element={<NewPost />} />
          <Route path=":id" element={<EditPost />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
