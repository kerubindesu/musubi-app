import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { refreshAccessToken, selectIsAuthenticated } from '../features/auth/authSlice';
import NotFound from '../pages/NotFound';
import { SendResetPasswordToken, Login, Register, ResetPassword, VerifyEmail } from '../features/auth/pages';

const AuthRoutes = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(refreshAccessToken())
    }
    
    if (isAuthenticated) {
      navigate("/dash/home")
    }
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="send-reset-password-token" element={<SendResetPasswordToken />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
      <Route path="verify-email" element={<VerifyEmail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AuthRoutes