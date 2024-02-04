import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../features/auth/authSlice';


const DashHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout(navigate))
  };

  return (
    <div className='p-4 flex gap-4'>
      <div>Dash Header</div>
      <Link className='underline text-sky-500' to="/dash/users">Users</Link>
      <form onSubmit={handleLogout}>
        <button>Logout</button>
      </form>
    </div>
  )
}

export default DashHeader