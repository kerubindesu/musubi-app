import React from 'react'
import { TagList } from '../../components/organism'
import { Breadcrumb, HeadingTitle } from '../../../../components/atoms'
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../../notification/notificationSlice';
import { Notification } from '../../../notification/components/organism';

const Tags = () => {
  const dispatch = useDispatch();
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  const breadcrumbs = [
    { text: 'Dashboard', url: '/dash/home' },
    { text: 'Tags' },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <HeadingTitle variant={"text-lg"} text={"Tags"} />
      {isOpen && (
        <Notification
          message={message}
          type={type}
          onClose={handleCloseNotification}
        />
      )}
      <TagList />
    </>
  )
}

export default Tags