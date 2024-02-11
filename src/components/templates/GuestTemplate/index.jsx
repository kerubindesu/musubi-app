import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../../features/navbar/componets/organism';

const GuestTemplate = () => {
  return (
    <>
      <Navbar />
      <div className="pt-2 px-4 min-h-[100vh]">
        <Outlet />
      </div>
    </>
  );
};

export default GuestTemplate;
