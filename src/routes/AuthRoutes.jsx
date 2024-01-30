import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Login, Register } from '../features'
import { useDispatch, useSelector } from 'react-redux';
import { refreshAccessToken, selectIsAuthenticated } from '../features/auth/authSlice';

const AuthRoutes = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(refreshAccessToken())
    }
    
    if (isAuthenticated) {
      navigate("/dash")
    }
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
    </Routes>
  )
}

export default AuthRoutes