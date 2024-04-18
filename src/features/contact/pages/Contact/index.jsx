import React, { useEffect } from 'react'
import { EditForm } from '../../components/organism'
import { Breadcrumb, HeadingTitle } from '../../../../components/atoms'
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../../notification/notificationSlice';
import { Notification } from '../../../notification/components/organism';
import { getContact } from '../../contactSlice';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  const dispatch = useDispatch();
  
  const { contact, isLoading } = useSelector((state) => state.contact);
  const { message, type, isOpen } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(getContact())
  }, [dispatch]);

  const pageTitle = "Contact";

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };
  
  const breadcrumbs = [
    { text: "Dashboard", url: "/dash/home" },
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
      
      <div className="flex gap-4">
        <EditForm contact={contact} laoding={isLoading} />
      </div>
    </>
  )
}

export default Contact