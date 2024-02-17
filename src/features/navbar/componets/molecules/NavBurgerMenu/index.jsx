import React from 'react'
import { RiCloseLine } from 'react-icons/ri';
import NavMenu from '../NavMenu';

const NavBurgerMenu = ({ onClose }) => {
  return (
    <>
      <div className="py-2 h-screen max-w-[20rem] flex flex-col justify-between items-start bg-white backdrop-blur-sm absolute inset-0 shadow z-20 text-base overflow-y-auto">
          <div className="pt-12 w-full flex flex-col text-base">
            
            {/* Navbar Menu */}
            <NavMenu variant={"w-full flex flex-col md:hidden justify-center items-start"} />

          </div>
          <div onClick={onClose} className="p-2 bg-slate-200 rounded-full absolute top-[1rem] right-4 cursor-pointer">
              <RiCloseLine />
          </div>
      </div>
      <div onClick={onClose} className="bg-white/65 backdrop-blur absolute inset-0 h-screen w-screen z-10"></div>
    </>
  )
};

export default NavBurgerMenu