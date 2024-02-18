import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hideNotification } from '../../../notificationSlice';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';

const Notification = ({ message, type, onClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(hideNotification());
    }, 3000);

    return () => clearTimeout(timeout);
  }, [dispatch]);

  const handleDismiss = () => {
    dispatch(hideNotification());
    onClose();
  };

  return (
    <div
      className={`mt-4 mr-4 p-4 fixed top-0 right-0 bg-black/80 border-l-8 rounded shadow z-50 ${
        type === "success" ? 'border-emerald-500' : 'border-red-500'
      } text-white`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {type === "success" ? (
            <RiCheckLine className="text-2xl" />
          ) : (
            ""
          )}
          <span>{message}</span>
        </div>
        <button onClick={handleDismiss}>
          <RiCloseLine className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Notification;