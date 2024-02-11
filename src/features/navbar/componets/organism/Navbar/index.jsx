import React, { useState, useEffect } from "react";
import { RiWindowsFill, RiMenuLine, RiAccountCircleLine, RiWhatsappLine, RiFacebookCircleLine } from 'react-icons/ri';
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { NavBurgerMenu, NavMenu, NavOption } from "../../molecules";
import { Logo } from "../../../../../components/molecules"
import { useDispatch, useSelector } from "react-redux";
import { getUserAuth, logout } from "../../../../auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [burgerMenu, setBurgerMenu] = useState(false);
    const [myOption, setMyOption] = useState(false);
    const [onScrolling, setOnScrolling] = useState(false);

    const { userAuth } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getUserAuth())
    }, [dispatch])

    useEffect(() => {
        if (burgerMenu || myOption) {
            disableBodyScroll(document);
        } else {
            enableBodyScroll(document);
        }
    }, [burgerMenu, myOption]);

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

    const handleBurgerMenu = () => {
        setMyOption(false);
        setBurgerMenu(prevState => !prevState);
    };

    const handleMyOption = () => {
        setBurgerMenu(false);
        setMyOption(prevState => !prevState);
    };

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout(navigate))
      };

    return (
        <>
            <div className={`px-4 h-14 w-full box-border flex justify-between items-center text-base sticky top-0 backdrop-blur-sm transition ease-in duration-300 ${onScrolling ? 'bg-white/10' : 'bg-white'}`}>
                <div className="max-h-max md:w-[7rem] box-border overflow-hidden flex justify-start items-center text-2xl gap-4">
                    <RiMenuLine onClick={handleBurgerMenu} className="block md:hidden cursor-pointer" />
                    {burgerMenu && (
                        <>
                            <NavBurgerMenu onClose={() => setBurgerMenu(false)} />
                        </>
                    )}

                    <Logo
                        variant="justify-center md:justify-start"
                        icon={<RiWindowsFill />}
                        text={"Microsoft"}
                    />
                </div>

                <NavMenu />
                
                <div className="max-h-max w-[7rem] box-border overflow-hidden flex justify-end items-center text-2xl gap-4">
                    <div className="flex justify-center items-center gap-2">
                        <RiFacebookCircleLine />
                        <RiWhatsappLine />
                    </div>
                    {userAuth && (
                        <div className="bg-slate-200 p-2 rounded-full">
                            <RiAccountCircleLine onClick={handleMyOption} className="cursor-pointer" />
                            {myOption && (
                                <NavOption
                                    onClose={() => {setMyOption(false)}} 
                                    userAuth={{username: userAuth.username, name: userAuth.name}}
                                    onLogout={handleLogout}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar;
