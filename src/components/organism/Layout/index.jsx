import React from 'react';
// import { Footer } from '../../organism';

const MainLayout = ({ children }) => {
  return (
    <div className="w-screen max-w-screen bg-white overflow-x-hidden box-border">
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;