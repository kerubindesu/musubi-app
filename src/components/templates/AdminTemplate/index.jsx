import React from 'react';
import { Outlet } from 'react-router-dom';
import { DashHeader } from '../../organism';

const AdminTemplate = () => {
  return (
    <div className='bg-sky-50/50'>
      <DashHeader />
      <main className="p-4 min-h-[100vh]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminTemplate;
