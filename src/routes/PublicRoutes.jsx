import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GuestTemplate } from '../components/templates';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import About from '../pages/About';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<GuestTemplate />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
