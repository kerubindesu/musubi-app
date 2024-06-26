import React from 'react'
import { UserList } from '../../components'
import { Breadcrumb, HeadingTitle } from '../../../../components/atoms'
import { Notification } from '../../../notification/components/organism';
import { hideNotification } from '../../../notification/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

const Users = () => {
  const dispatch = useDispatch()
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  const pageTitle = "Users"

  const breadcrumbs = [
    { text: "Dashboard", url: "/dash/home" },
    { text: pageTitle, url: "/dash/users" },
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
      <UserList />
    </>
  )
}

export default Users