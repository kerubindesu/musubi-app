import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';
import MainLayout from '../components/organism/Layout';

const AppRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="dash/*" element={<ProtectedRoutes />} />
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;
