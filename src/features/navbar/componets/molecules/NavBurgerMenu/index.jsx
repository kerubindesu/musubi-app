import React from 'react'
import { RiCloseLine } from 'react-icons/ri';

const NavBurgerMenu = ({ onClose }) => {
  return (
    <>
        <div className="py-2 h-screen max-w-[20rem] flex flex-col justify-between items-start bg-white backdrop-blur-sm absolute inset-0 shadow z-20 text-base">
            <div className="pt-12 w-full flex flex-col text-base">
                <div className="py-2 px-4 hover:bg-slate-100 cursor-pointer truncate">Apps</div>
                <div className="py-2 px-4 hover:bg-slate-100 cursor-pointer truncate">Games</div>
                <div className="py-2 px-4 hover:bg-slate-100 cursor-pointer truncate">Music</div>
            </div>
            <div onClick={onClose} className="p-2 bg-slate-200 rounded-full absolute top-4 right-4 cursor-pointer">
                <RiCloseLine />
            </div>
        </div>
        <div onClick={onClose} className="bg-white/65 backdrop-blur absolute inset-0 h-screen w-screen z-10"></div>
    </>
  )
};

export default NavBurgerMenu