import React from 'react'
import { Breadcrumb, HeadingTitle } from '../../../../components/atoms'
import { LogoConfigurationForm } from '../../components/organism'
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../../notification/notificationSlice';
import { Notification } from '../../../notification/components/organism';
import { Helmet } from 'react-helmet-async';

const LogoConfiguration = () => {
  const dispatch = useDispatch();
  const { message, type, isOpen } = useSelector((state) => state.notification);

  console.log(message)

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  const pageTitle = "Logo";

  const breadcrumbs = [
    { text: "Dashboard", url: "/dash/home" },
    { text: pageTitle },
  ];

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <Breadcrumb items={breadcrumbs} />

      <HeadingTitle variant={"text-lg"} text={pageTitle} />
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