import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GuestTemplate } from '../components/templates';
import GuestHome from '../pages/GuestHome';
import NotFound from '../pages/NotFound';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<GuestTemplate />}>
        <Route index element={<GuestHome />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
