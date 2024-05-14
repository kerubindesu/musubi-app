import React, { useEffect } from 'react'
import { RiCloseLine } from 'react-icons/ri';
import NavMenu from '../NavMenu';
import { useDispatch, useSelector } from 'react-redux';
import { setNavBurgerMenu } from '../../../navbarSlice';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { motion, AnimatePresence } from 'framer-motion';

const NavBurgerMenu = () => {
  const dispatch = useDispatch()

  const { navBurgerMenu } = useSelector((state) => state.navbar);

    useEffect(() => {
        if (navBurgerMenu) {
            disableBodyScroll(document);
        } else {
            enableBodyScroll(document);
        }
    }, [navBurgerMenu]);

  return (
    <>
      <AnimatePresence>
        {navBurgerMenu && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="py-2 h-screen max-w-[20rem] flex flex-col justify-between items-start md:hidden bg-white backdrop-blur-sm fixed inset-0 shadow z-20 text-base overflow-y-auto"
          >
            <div className="py-2 h-screen max-w-[20rem] flex flex-col justify-between items-start md:hidden bg-white backdrop-blur-sm fixed inset-0 shadow z-20 text-base overflow-y-auto">
                <div className="pt-12 w-full flex flex-col text-base">
                  
                  {/* Navbar Menu */}
                  <NavMenu variant={"w-full flex flex-col md:hidden justify-center items-start"} />

                </div>
                <div onClick={() => dispatch(setNavBurgerMenu(false))} className="p-2 bg-slate-200 rounded-full fixed top-[1rem] right-4 cursor-pointer">
                    <RiCloseLine />
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {navBurgerMenu && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => dispatch(setNavBurgerMenu(false))}
          className="flex md:hidden bg-white/65 backdrop-blur absolute inset-0 h-screen w-screen z-10"
        ></motion.div>
      )}
    </>
  )
};

export default NavBurgerMenu