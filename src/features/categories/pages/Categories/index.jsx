import React from 'react'
import { CategoryList } from '../../components/organism'
import { Breadcrumb, HeadingTitle } from '../../../../components/atoms'
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../../notification/notificationSlice';
import { Notification } from '../../../notification/components/organism';

const Categories = () => {
  const dispatch = useDispatch();
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  const breadcrumbs = [
    { text: 'Dashboard', url: '/dash/home' },
    { text: 'Categories' },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <HeadingTitle variant={"text-lg"} text={"Categories"} />
      {isOpen && (
        <Notification
          message={message}
          type={type}
          onClose={handleCloseNotification}
        />
      )}
      <CategoryList />
    </>
  )
}

export default Categories