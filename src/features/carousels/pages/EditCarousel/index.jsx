import React from 'react'
import { Breadcrumb, HeadingTitle } from '../../../../components/atoms'
import { EditForm } from '../../components/organism'
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../../notification/notificationSlice';
import { Notification } from '../../../notification/components/organism';
import { Helmet } from 'react-helmet-async';

const EditCarousel = () => {
  const dispatch = useDispatch();
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  const pageTitle = "Edit Carousel";
  
  const breadcrumbs = [
    { text: "Dashboard", url: "/dash/home" },
    { text: "Carousels", url: "/dash/carousels" },
    { text: pageTitle },
  ];

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <Breadcrumb items={breadcrumbs} />

      <HeadingTitle
        text={pageTitle}
        back={true} 
        mainVariant={"mb-9"}
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

export default EditCarousel