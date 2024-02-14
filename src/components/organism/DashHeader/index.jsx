import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../features/auth/authSlice';
import { Logo } from '../../atoms';


const DashHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout(navigate))
  };

  return (
    <div className='p-4 max-h-16 flex justify-between items-center gap-4 bg-white shadow'>
      <div className='flex justify-start items-center w-full overflow-x-auto no-scrollbar gap-4'>
        <Logo variant={"max-h-[3.5rem]"} />
        <Link className='text-sky-500' to="/dash/users">Users</Link>
        <Link className='text-sky-500' to="/dash/posts">Post</Link>
        <Link className='text-sky-500' to="/dash/settings">Settings</Link>
        <Link className='text-sky-500' to="/dash/settings/logo">logo</Link>
        <Link className='text-sky-500' to="/dash/menus">Menu</Link>
      </div>
      <form onSubmit={handleLogout}>
        <button>Logout</button>
      </form>
    </div>
  )
}

export default DashHeader