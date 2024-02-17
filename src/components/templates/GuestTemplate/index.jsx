import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../../features/navbar/componets/organism';

const GuestTemplate = () => {
  return (
    <>
      <Navbar />
      <div className="relative mx-auto pt-16 px-4 min-h-[200vh] w-full max-w-7xl bg-white">
        <Outlet />
      </div>
    </>
  );
};

export default GuestTemplate;
