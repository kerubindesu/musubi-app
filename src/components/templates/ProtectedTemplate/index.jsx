import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../../features/sidebar/components/organism';
import { DashHeader } from '../../organism';

const ProtectedTemplate = () => {
  return (
      <div className='bg-sky-50/50'>
        <DashHeader />
        <Sidebar />
        <div className="px-6 mt-16 md:mt-0 mb-10 sm:pl-[14.75rem] min-h-screen flex flex-col justify-start overflow-x-hidden text-sm bg-white">
          <Outlet />
        </div>
      </div>
  );
};

export default ProtectedTemplate;
