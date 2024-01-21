import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminTemplate = () => {
  return (
    <div className="admin-template">
      <header>
        {/* Navbar Admin */}
        
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminTemplate;
