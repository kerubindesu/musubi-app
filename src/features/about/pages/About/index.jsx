import React, { useEffect } from 'react'
import { EditForm } from '../../components/organism'
import { HeadingTitle } from '../../../../components/atoms'
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../../notification/notificationSlice';
import { Notification } from '../../../notification/components/organism';
import { getAbout } from '../../aboutSlice';

const About = () => {
  const dispatch = useDispatch();
  
  const { about, loading } = useSelector((state) => state.about);
  const { message, type, isOpen } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(getAbout())
  }, [dispatch])

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };
  
  return (
    <div className="relative w-full overflow-x-hidden">
      <HeadingTitle variant={"text-2xl"} text={"About"} />
      {isOpen && (
        <Notification
          message={message}
          type={type}
          onClose={handleCloseNotification}
        />
      )}
      <div className="flex gap-4">
        <EditForm about={about} laoding={loading} />
      </div>
    </div>
  )
}

export default About