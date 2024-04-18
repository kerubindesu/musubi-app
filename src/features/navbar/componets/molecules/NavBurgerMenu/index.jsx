import React from 'react'
import { RiCloseLine } from 'react-icons/ri';
import NavMenu from '../NavMenu';
import { useDispatch } from 'react-redux';
import { setNavBurgerMenu } from '../../../navbarSlice';

const NavBurgerMenu = () => {
  const dispatch = useDispatch()

  return (
    <>
      <div className="py-2 h-screen max-w-[20rem] flex flex-col justify-between items-start md:hidden bg-white backdrop-blur-sm fixed inset-0 shadow z-20 text-base overflow-y-auto">
          <div className="pt-12 w-full flex flex-col text-base">
            
            {/* Navbar Menu */}
            <NavMenu variant={"w-full flex flex-col md:hidden justify-center items-start"} />

          </div>
          <div onClick={() => dispatch(setNavBurgerMenu(false))} className="p-2 bg-slate-200 rounded-full fixed top-[1rem] right-4 cursor-pointer">
              <RiCloseLine />
          </div>
      </div>
      <div onClick={() => dispatch(setNavBurgerMenu(false))} className="flex md:hidden bg-white/65 backdrop-blur absolute inset-0 h-screen w-screen z-10"></div>
    </>
  )
};

export default NavBurgerMenu