import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { HeadingTitle } from '../../../components/atoms';
import { hideNotification } from '../../../features/notification/notificationSlice';
import { Notification } from '../../../features/notification/components/organism';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };
  
  return (
    <div>
      <HeadingTitle variant={"text-2xl"} text={"Dashboard"} />
      {isOpen && (
        <Notification
          message={message}
          type={type}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  )
}

export default AdminDashboard