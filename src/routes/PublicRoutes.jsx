import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GuestTemplate } from '../components/templates';
import { About, Category, Home } from '../pages';
import NotFound from '../pages/NotFound';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<GuestTemplate />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<Category />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
