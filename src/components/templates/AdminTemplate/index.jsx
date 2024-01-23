import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashHeader } from '../../organism';

const AdminTemplate = () => {
  return (
    <>
      <DashHeader />
      <main className="pt-2 px-4 min-h-[100vh]">
        <Outlet />
      </main>
    </>
  );
};

export default AdminTemplate;
