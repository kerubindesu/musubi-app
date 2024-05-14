import React, { useEffect } from 'react'
import { FormUserSettings } from '../../components'
import { Breadcrumb, HeadingTitle } from '../../../../components/atoms'
import { hideNotification } from '../../../notification/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { getUserAuth } from '../../../auth/authSlice';
import { Notification } from '../../../notification/components/organism';

const UserSettings = () => {
  const dispatch = useDispatch()

  const { message, type, isOpen } = useSelector((state) => state.notification);

  const { userAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserAuth())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  const pageTitle = "User Settings"

  const breadcrumbs = [
    { text: "Dashboard", url: "/dash/home" },
    { text: "Users", url: "/dash/users" },
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
      <FormUserSettings userAuth={userAuth} />
    </>
  )
}

export default UserSettings