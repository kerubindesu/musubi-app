import React from 'react'
import { HeadingTitle } from '../../../../components/atoms'
import { LogoSettingsForm } from '../../components/organism'
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../../notification/notificationSlice';
import { Notification } from '../../../notification/components/organism';

const LogoSettings = () => {
  const dispatch = useDispatch();
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  return (
    <>
      <HeadingTitle variant={"text-2xl"} text={"Logo Settings"} />
      {isOpen && (
        <Notification
          message={message}
          type={type}
          onClose={handleCloseNotification}
        />
      )}
      <LogoSettingsForm />
    </>
  )
}

export default LogoSettings