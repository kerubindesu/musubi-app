import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../redux/authSlice';
import { useParams } from 'react-router-dom'; // Asumsikan menggunakan React Router

const VerifyEmail = () => {
  const { token } = useParams(); // Mendapatkan token dari URL
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token));
    }
  }, [dispatch, token]);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {loading && <p className="text-blue-500">Verifying your email...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );
};

export default VerifyEmail;