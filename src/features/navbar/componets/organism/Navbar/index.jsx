import React, { useState, useEffect } from "react";
import { RiMenuLine, RiWhatsappLine, RiFacebookCircleLine } from 'react-icons/ri';
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { NavBurgerMenu, NavMenu } from "../../molecules";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuth, logout } from "../../../../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Dropdown, Logo, Placeholder } from "../../../../../components/atoms";
import { setNavBurgerMenu } from "../../../navbarSlice";

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const { userAuth, loading: AuthLoading } = useSelector((state) => state.auth);

    const { navBurgerMenu } = useSelector((state) => state.navbar);

    useEffect(() => {
        dispatch(getUserAuth())
    }, [dispatch])

    useEffect(() => {
        if (navBurgerMenu) {
            disableBodyScroll(document);
        } else {
            enableBodyScroll(document);
        }
    }, [navBurgerMenu]);

    useEffect(() => {
        const handleScroll = () => {
          const currentScrollPos = window.pageYOffset;
          const isScrollDown = prevScrollPos < currentScrollPos;
    
          setVisible(currentScrollPos <= 0 || !isScrollDown);
          setPrevScrollPos(currentScrollPos);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => window.removeEventListener('scroll', handleScroll);
      }, [prevScrollPos]);

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout(navigate))
    };

    const dropdownOptions = [
        { label: 'Dashboard', link: '/dash/home' },
        { label: 'Settings', link: '/settings' },
    ];

    return (
        <div className={`
            ${visible  ? 'bg-white' : 'hidden'}
            ${prevScrollPos <= 218 ? "bg-white/20" : ""} 
            fixed top-0 w-full z-10 transition-all duration-300`
        }>
            <div className={`mx-auto px-3 h-16 w-full max-w-7xl box-border flex justify-between items-center text-base backdrop-blur-sm transition ease-in duration-300`}>
                <div className="max-h-max md:w-[7rem] box-border overflow-hidden flex justify-start items-center text-2xl gap-2">
                    <RiMenuLine onClick={() => dispatch(setNavBurgerMenu(true))} className="block md:hidden cursor-pointer" />
                    {navBurgerMenu && (
                        <>
                            <NavBurgerMenu onClose={() => dispatch(setNavBurgerMenu(false))} />
                        </>
                    )}

                    <Logo link={"/"} variant="max-h-[3rem] box-border" />
                </div>

                <NavMenu variant={"mx-3 h-full w-full hidden md:flex justify-center items-center gap-6"} />
                
                <div className="max-h-max w-[7rem] box-border flex justify-end items-center gap-4">
                    <div className="flex justify-center items-center gap-2">
                        <RiFacebookCircleLine className="text-2xl" />
                        <RiWhatsappLine className="text-2xl" />
                    </div>
                    {AuthLoading && AuthLoading ? (
                        <>
                            <Placeholder variant={"h-8 w-8 rounded-full"} />
                        </>
                    ) : (
                        <>
                        {userAuth && (
                            <Dropdown onLogout={handleLogout} options={dropdownOptions}>
                                <div className="h-8 w-8 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer text-lg font-semibold">
                                    {Array.from(`${userAuth.name}`)[0]}
                                </div>
                            </Dropdown>
                        )}
                        </>
                    ) }
                </div>
            </div>
        </div>
    )
}

export default Navbar;
