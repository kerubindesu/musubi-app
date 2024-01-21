import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminTemplate } from '../components/templates';
import AdminDashboard from '../pages/admin/AdminDashboard';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminTemplate />} >
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
