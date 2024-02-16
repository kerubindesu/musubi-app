import React from 'react'
import { Breadcrumb, HeadingTitle } from '../../../../components/atoms'
import { LogoConfigurationForm } from '../../components/organism'
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../../notification/notificationSlice';
import { Notification } from '../../../notification/components/organism';

const LogoConfiguration = () => {
  const dispatch = useDispatch();
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  const breadcrumbs = [
    { text: 'Dashboard', url: '/dash/home' },
    { text: 'Logo' },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <HeadingTitle variant={"text-lg"} text={"Logo"} />
      {isOpen && (
        <Notification
          message={message}
          type={type}
          onClose={handleCloseNotification}
        />
      )}
      <LogoConfigurationForm />
    </>
  )
}

export default LogoConfiguration