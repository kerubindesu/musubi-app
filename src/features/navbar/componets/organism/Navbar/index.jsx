import React, { useState, useEffect } from "react";
import { RiWindowsFill, RiMenuLine, RiWhatsappLine, RiFacebookCircleLine } from 'react-icons/ri';
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { NavBurgerMenu, NavMenu, NavOption } from "../../molecules";
import { Logo } from "../../../../../components/molecules"
import { useDispatch, useSelector } from "react-redux";
import { getUserAuth, logout } from "../../../../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../../../components/atoms";
import { setNavBurgerMenu, setNavOption } from "../../../navbarSlice";

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [onScrolling, setOnScrolling] = useState(false);

    const { userAuth, loading: AuthLoading } = useSelector((state) => state.auth);

    const { navBurgerMenu, navOption } = useSelector((state) => state.navbar);

    useEffect(() => {
        dispatch(getUserAuth())
    }, [dispatch])

    useEffect(() => {
        if (navBurgerMenu || navOption) {
            disableBodyScroll(document);
        } else {
            enableBodyScroll(document);
        }
    }, [navBurgerMenu, navOption]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const isScrollingDown = currentScrollPos > 50;

            setOnScrolling(isScrollingDown);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout(navigate))
    };

    console.log(navOption)

    return (
        <div className={`${onScrolling ? 'bg-white/10' : 'bg-white'} sticky top-0 w-full border-b`}>
            <div className={`mx-auto px-4 h-14 w-full max-w-7xl box-border flex justify-between items-center text-base backdrop-blur-sm transition ease-in duration-300`}>
                <div className="max-h-max md:w-[7rem] box-border overflow-hidden flex justify-start items-center text-2xl gap-4">
                    <RiMenuLine onClick={() => dispatch(setNavBurgerMenu(true))} className="block md:hidden cursor-pointer" />
                    {navBurgerMenu && (
                        <>
                            <NavBurgerMenu onClose={() => dispatch(setNavBurgerMenu(false))} />
                        </>
                    )}

                    <Logo
                        variant="justify-center md:justify-start"
                        icon={<RiWindowsFill />}
                        text={"Microsoft"}
                    />
                </div>

                <NavMenu variant={"w-[30rem] hidden md:flex justify-center items-center gap-6 lg:gap-8"} />
                
                <div className="max-h-max w-[7rem] box-border overflow-hidden flex justify-end items-center gap-4">
                    <div className="flex justify-center items-center gap-2">
                        <RiFacebookCircleLine className="text-2xl" />
                        <RiWhatsappLine className="text-2xl" />
                    </div>
                    {AuthLoading && AuthLoading ? (
                        <div className="">
                            <Loading />
                        </div>
                    ) : (
                        <>
                        {userAuth && (
                            <>
                                <div onClick={() => dispatch(setNavOption(true))} className="h-8 w-8 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer text-lg font-semibold">
                                    {Array.from(`${userAuth.name}`)[0]}
                                </div>
                                {navOption && (
                                    <NavOption
                                        onClose={() => {dispatch(setNavOption(false))}} 
                                        userAuth={{username: userAuth.username, name: userAuth.name}}
                                        onLogout={handleLogout}
                                    />
                                )}
                            </>
                        )}
                        </>
                    ) }
                </div>
            </div>
        </div>
    )
}

export default Navbar;
