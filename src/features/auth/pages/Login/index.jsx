import React from 'react'
import { AuthHeader } from '../../../../components/organism'
import { LoginForm } from '../../components/organism'
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../../notification/notificationSlice';
import { Notification } from '../../../notification/components/organism';
import { Helmet } from 'react-helmet-async';

const Login = () => {
  const dispatch = useDispatch();
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="relative min-h-[100vh] max-w-screen overflow-x-hidden bg-gradient-to-b from-slate-100 to-slate-50 flex flex-col justify-center sm:flex-row sm:justify-end items-center">
        <AuthHeader />
        {isOpen && (
          <Notification
            message={message}
            type={type}
            onClose={handleCloseNotification}
          />
        )}
        <LoginForm />
      </div>
    </>
  )
}

export default Login