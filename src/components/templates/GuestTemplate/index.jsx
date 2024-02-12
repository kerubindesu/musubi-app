import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../../features/navbar/componets/organism';

const GuestTemplate = () => {
  return (
    <>
      <Navbar />
      <div className="mx-auto pt-2 px-4 min-h-[100vh] w-full max-w-7xl">
        <Outlet />
      </div>
    </>
  );
};

export default GuestTemplate;
