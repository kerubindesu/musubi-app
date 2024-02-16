import React from 'react'
import { BannersList } from '../../components/organism'
import { HeadingTitle } from '../../../../components/atoms'
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../../notification/notificationSlice';
import { Notification } from '../../../notification/components/organism';

const Banners = () => {
  const dispatch = useDispatch();
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };
  
  return (
    <div>
      <HeadingTitle variant={"text-2xl"} text={"Banner"} />
      {isOpen && (
        <Notification
          message={message}
          type={type}
          onClose={handleCloseNotification}
        />
      )}
      <BannersList />
    </div>
  )
}

export default Banners