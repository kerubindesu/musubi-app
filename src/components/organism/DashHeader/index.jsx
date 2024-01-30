import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../features/auth/authSlice';


const DashHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout(navigate))
  };

  return (
    <>
      <div>Dash Header</div>
      <form onSubmit={handleLogout}>
        <button>Logout</button>
      </form>
    </>
  )
}

export default DashHeader