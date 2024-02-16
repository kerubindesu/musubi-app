import React from 'react'
import { Breadcrumb, HeadingTitle } from '../../../../components/atoms'
import { AddForm } from '../../components/organism'
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../../notification/notificationSlice';
import { Notification } from '../../../notification/components/organism';

const AddPost = () => {
  const dispatch = useDispatch();
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  const breadcrumbs = [
    { text: 'Dashboard', url: '/dash/home' },
    { text: 'Posts', url: '/dash/posts' },
    { text: 'Add Post' },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <HeadingTitle
        text={"Add Post"}
        back={true} 
        marginBottom={"mb-9"}
        variant={"text-lg"}
      />
      {isOpen && (
        <Notification
          message={message}
          type={type}
          onClose={handleCloseNotification}
        />
      )}
      <AddForm />
    </>
  )
}

export default AddPost