import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, HeadingTitle } from '../../components/atoms';
import { hideNotification } from '../../features/notification/notificationSlice';
import { Notification } from '../../features/notification/components/organism';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };
  
  const breadcrumbs = [
    { text: 'Dashboard', url: '/dash/home' },
    { text: 'Home' },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <HeadingTitle variant={"text-lg"} text={"Home"} />
      {isOpen && (
        <Notification
          message={message}
          type={type}
          onClose={handleCloseNotification}
        />
      )}
    </>
  )
}

export default Dashboard