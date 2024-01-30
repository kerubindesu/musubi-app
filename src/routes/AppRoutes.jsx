import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import AdminRoutes from './AdminRoutes';
import MainLayout from '../components/organism/Layout';

const AppRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="dash/*" element={<AdminRoutes />} />
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;
