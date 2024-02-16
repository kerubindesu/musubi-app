import React from 'react'
import { Breadcrumb, HeadingTitle } from '../../../../components/atoms'
import { EditForm } from '../../components/organism'
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../../notification/notificationSlice';
import { Notification } from '../../../notification/components/organism';

const EditAbout = () => {
  const dispatch = useDispatch();
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };
  
  const breadcrumbs = [
    { text: 'Dashboard', url: '/dash/home' },
    { text: 'About', url: '/dash/about' },
    { text: 'Edit About' },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <HeadingTitle
        text={"Edit About"}
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
      <EditForm />
    </>
  )
}

export default EditAbout