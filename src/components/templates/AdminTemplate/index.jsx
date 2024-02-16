import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../../features/sidebar/components/organism';
import { DashHeader } from '../../organism';

const AdminTemplate = () => {
  return (
    <div className='bg-sky-50/50'>
      <DashHeader />
      <Sidebar />
      <div className="pt-4 px-3 lg:pl-[14.75rem] min-h-screen flex flex-col justify-start overflow-hidden text-sm bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminTemplate;
