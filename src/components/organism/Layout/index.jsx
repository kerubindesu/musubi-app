import React from 'react';
import { Footer } from '../../organism';

const MainLayout = ({ children }) => {
  return (
    <>
      { children }
      <Footer />
    </>
  );
};

export default MainLayout;