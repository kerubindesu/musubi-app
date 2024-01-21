import React from 'react';
import { AdminTemplate, GuestTemplate } from '../../templates';

const MainLayout = ({ isAdmin, children }) => {
  return isAdmin ? (
    <AdminTemplate>{children}</AdminTemplate>
  ) : (
    <GuestTemplate>{children}</GuestTemplate>
  );
};

export default MainLayout;