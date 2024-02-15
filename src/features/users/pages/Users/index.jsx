import React from 'react'
import { UserList } from '../../components'
import { HeadingTitle } from '../../../../components/atoms'
import { Notification } from '../../../notification/components/organism';
import { hideNotification } from '../../../notification/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';

const Users = () => {
  const dispatch = useDispatch()
  const { message, type, isOpen } = useSelector((state) => state.notification);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  return (
    <div>
      <HeadingTitle variant={"text-2xl"} text={"Users"} />
      {isOpen && (
        <Notification
          message={message}
          type={type}
          onClose={handleCloseNotification}
        />
      )}
      <UserList />
    </div>
  )
}

export default Users