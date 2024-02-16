import React from 'react'
import { Breadcrumb, HeadingTitle } from '../../../../components/atoms'
import { EditForm } from '../../components/organism'
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../../notification/notificationSlice';
import { Notification } from '../../../notification/components/organism';

const EditBanner = () => {
  const dispatch = useDispatch();
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };
  
  const breadcrumbs = [
    { text: 'Dashboard', url: '/dash/home' },
    { text: 'Banners', url: '/dash/banners' },
    { text: 'Edit Banner' },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <HeadingTitle
        text={"Edit Banner"}
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

export default EditBanner