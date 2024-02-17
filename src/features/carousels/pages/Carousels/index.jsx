import React from 'react'
import { CarouselsList } from '../../components/organism'
import { Breadcrumb, HeadingTitle } from '../../../../components/atoms'
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../../notification/notificationSlice';
import { Notification } from '../../../notification/components/organism';

const Carousels = () => {
  const dispatch = useDispatch();
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };
  
  const breadcrumbs = [
    { text: 'Dashboard', url: '/dash/home' },
    { text: 'Carousels' },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbs} />
      <HeadingTitle variant={"text-lg"} text={"Carousels"} />
      {isOpen && (
        <Notification
          message={message}
          type={type}
          onClose={handleCloseNotification}
        />
      )}
      <CarouselsList />
    </>
  )
}

export default Carousels