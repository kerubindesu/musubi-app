import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GuestTemplate } from '../components/templates';
import GuestHome from '../pages/GuestHome';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestTemplate />}>
        <Route index element={<GuestHome />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
