import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import AdminRoutes from './AdminRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/*" element={<PublicRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
