import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { refreshAccessToken, selectIsAuthenticated } from '../features/auth/authSlice';
import NotFound from '../pages/NotFound';
import { Login } from '../features/auth/pages';

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
      <Route path="*" element={<NotFound />} />
    </Routes>

  )
}

export default AuthRoutes