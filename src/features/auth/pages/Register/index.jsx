import React from 'react'
import { AuthHeader } from '../../../../components/organism'
import { RegisterForm } from '../../components/organism'
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../../notification/notificationSlice';
import { Notification } from '../../../notification/components/organism';
import { Helmet } from 'react-helmet-async';

const Register = () => {
  const dispatch = useDispatch();
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };
  
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>

      <div className="relative min-h-[100vh] max-w-screen overflow-x-hidden bg-gradient-to-b from-sky-800 to-sky-500 flex flex-col justify-center md:flex-row md:justify-end items-center">
        <AuthHeader />
        {isOpen && (
          <Notification
            message={message}
            type={type}
            onClose={handleCloseNotification}
          />
        )}
        <RegisterForm />
      </div>
    </>
  )
}

export default Register