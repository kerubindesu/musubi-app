import React from 'react'
import { HeadingTitle } from '../../../../components/atoms'
import { EditForm } from '../../components/organism'
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../../notification/notificationSlice';
import { Notification } from '../../../notification/components/organism';

const EditMenu = () => {
  const dispatch = useDispatch();
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };
  
  return (
    <>
      <HeadingTitle
        text={"Edit Post"}
        back={true} 
        marginBottom={"mb-8"}
        variant={"text-2xl"}
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

export default EditMenu