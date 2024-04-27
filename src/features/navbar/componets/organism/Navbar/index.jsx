import React, { useState, useEffect } from "react";
import { RiMenuLine, RiLoginCircleLine } from 'react-icons/ri';
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { NavBurgerMenu, NavMenu } from "../../molecules";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuth, logout } from "../../../../auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Logo, Placeholder } from "../../../../../components/atoms";
import { setNavBurgerMenu } from "../../../navbarSlice";

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const { userAuth, isLoading: isAuthLoading, errRefreshToken } = useSelector((state) => state.auth);

    const { navBurgerMenu } = useSelector((state) => state.navbar);

    useEffect(() => {
        dispatch(getUserAuth())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (navBurgerMenu) {
            disableBodyScroll(document);
        } else {
            enableBodyScroll(document);
        }
    }, [navBurgerMenu]);

    useEffect(() => {
        const handleScroll = () => {
          const currentScrollPos = window.scrollY;
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
            ${prevScrollPos === 0 ? "border-none" : "shadow"}
            ${visible  ? "bg-white" : "hidden"}
            fixed top-0 w-full z-20 transition-all duration-300`
        }>
            <div className="max-w-7xl mx-auto px-3">
                <div className="container mx-auto h-16 box-border flex justify-between items-center gap-3 text-base backdrop-blur-sm transition ease-in duration-300">
                    <div className="max-h-max md:w-[7rem] box-border overflow-hidden flex justify-start items-center text-2xl gap-2">
                        <RiMenuLine onClick={() => dispatch(setNavBurgerMenu(true))} className="block md:hidden cursor-pointer" />
                        <Logo link={"/"} variant="max-h-[3rem] box-border" />
                    </div>

                    <NavMenu variant={"h-full hidden md:flex justify-center items-center gap-6 overflow-x-auto no-scrollbar"} />
                    
                    <div className="max-h-max w-[7rem] box-border flex justify-end items-center gap-4">
                        {isAuthLoading ? (
                            <>
                                <Placeholder variant={"h-10 w-10 rounded-full"} />
                            </>
                        ) : userAuth ?  (
                            <Dropdown onLogout={handleLogout} options={dropdownOptions}>
                                <div className="h-10 w-10 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer text-lg font-semibold">
                                    {Array.from(`${userAuth.name}`)[0]}
                                </div>
                            </Dropdown>
                        ) : errRefreshToken === "Unauthorized" && (
                            <Link to="/auth/login" className="flex justify-start items-center gap-1 text-sky-500">
                                <span className="text-base font-semibold">Login</span>
                                <RiLoginCircleLine className="text-xl"/>
                            </Link>
                        )}
                    </div>
                </div>
                {navBurgerMenu && <NavBurgerMenu />}
            </div>
        </div>
    )
}

export default Navbar;
