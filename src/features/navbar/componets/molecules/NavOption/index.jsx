import React from 'react'
import { RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const NavOption = ({ onClose, userAuth, onLogout }) => {
  return (
      <>
        <div className="py-2 h-screen min-w-[16rem] max-w-[20rem] overflow-hidden flex flex-col justify-between items-start bg-white backdrop-blur-sm absolute top-0 right-0 bottom-0 shadow z-20 truncate text-base">
            <div className="max-w-[20rem] flex flex-col gap-8">
              <div className="h-16 w-full flex flex-col justify-center">
                <div className="px-4 truncate text-xl text-semibold">{userAuth && userAuth.name}</div>
                <div className="px-4 truncate text-gray-500">{userAuth && userAuth.username}</div>
              </div>

              <div>
                <Link className="px-4 text-sky-600" to="/dash">Dashboard</Link>
              </div>
            </div>
            <div className="p-4 w-full border-t hover:bg-slate-100 text-base font-semibold cursor-pointer" onClick={onLogout}>Logout</div>
            <div onClick={onClose} className="h-8 w-8 flex items-center justify-center bg-gray-200 rounded-full text-lg font-semibold absolute top-[1rem] right-4 cursor-pointer">
                <RiCloseLine className="text-2xl" />
            </div>
        </div>
        <div onClick={onClose} className="bg-transparent absolute inset-0 h-screen w-screen z-10"></div>
    </>
  )
};

export default NavOption