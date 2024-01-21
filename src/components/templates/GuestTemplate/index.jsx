import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../organism';

const GuestTemplate = () => {
  return (
    <div className="guest-template">
      <Navbar />
      <main className="pt-2 px-4 min-h-[100vh]">
        <Outlet />
      </main>
    </div>
  );
};

export default GuestTemplate;
