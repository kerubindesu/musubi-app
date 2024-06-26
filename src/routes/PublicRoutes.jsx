import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GuestTemplate } from '../components/templates';
import { Contact, Category, Explore, Home, ProductDetail } from '../pages';
import NotFound from '../pages/NotFound';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<GuestTemplate />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="categories" element={<Category />} />
        <Route path="contact" element={<Contact />} />
        <Route path="product/:slug" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;
