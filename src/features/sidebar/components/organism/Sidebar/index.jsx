import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine, RiCloseLine, RiUserSettingsLine } from "react-icons/ri";
import { SidebarMenu } from "../../molecules";
import { DashFooter } from "../../../../../components/organism";
import { Loading, Logo } from "../../../../../components/atoms";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuth, logout } from "../../../../auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { setSidebar } from "../../../sidebarSlice";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  const { userAuth, isLoading: AuthLoading, error: errAuth, errRefreshToken } = useSelector((state) => state.auth);
  const { sidebar } = useSelector((state) => state.sidebar);

  useEffect(() => {
    dispatch(getUserAuth())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if ( errAuth && errRefreshToken) {
      navigate("/auth/login")
    }
  }, [errAuth, errRefreshToken, navigate]);

  useEffect(() => {
    if (sidebar) {
        disableBodyScroll(document);
    } else {
        enableBodyScroll(document);
    }
  }, [sidebar]);

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout(navigate))
  };

  return (
    <>
      <div className={`
        ${sidebar && sidebar ? "flex" : "hidden"}
        fixed z-30 sidebar inset-0 top-0 left-0 right-auto w-[14rem] sm:flex sm:flex-col sm:justify-between overflow-x-hidden overflow-y-hidden leading-6 bg-white
      `}>
        <div className="w-full h-full flex flex-col justify-start items-start">

          <div className="relative px-3 h-16 w-full flex justify-start items-center gap-2 border-r border-b">
            <div onClick={() => dispatch(setSidebar(!sidebar))} className="sm:hidden h-10 w-10 flex justify-center items-center rounded-full bg-slate-50 hover:bg-slate-200 focus:bg-slate-100 cursor-pointer">
              <RiCloseLine className="text-2xl" />
            </div>
            <Logo link={"/dash/home"} variant="max-h-[2.5rem]" />
          </div>

          <div className="px-3 py-3 w-full flex flex-col justify-center items-start gap-4 border-b truncate box-border border-r">

            {AuthLoading ? 
            (
              <div className="h-[2.75rem] w-full">
                <Loading />
              </div>
            ) : (
              <>
                <div className="w-full flex flex-row justify-between items-center">
                  <div className="max-w-[10rem] truncate">
                    <div className="text-base truncate font-semibold">{userAuth?.name}</div>
                    <div className="text-sm font-normal truncate">{userAuth?.username}</div>
                  </div>

                  {isOpen ? (
                    <div className="h-10 w-10 flex justify-end items-start cursor-pointer" onClick={() => (setIsOpen(false))}>
                      <RiArrowDropUpLine className="text-xl" />
                    </div>
                  ) : (
                    <div className="h-10 w-10 flex justify-end items-start cursor-pointer" onClick={() => (setIsOpen(true))} >
                      <RiArrowDropDownLine className="text-xl" />
                    </div>
                  )}
                </div>

                {isOpen && (
                  <div className="w-full flex flex-col gap-2">
                    <Link to={"/dash/users/settings"} className="px-4 h-10 w-full flex justify-start items-center gap-5 bg-white hover:bg-slate-100 text-gray-700 rounded cursor-pointer border">
                      <RiUserSettingsLine className="text-lg" />
                      <span className="text-sm">User Settings</span>
                    </Link>
                    <div className="px-4 h-10 w-full flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded cursor-pointer" onClick={handleLogout}>
                      <span className="text-sm">Logout</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex-1 w-full flex flex-col justify-between overflow-y-auto border-r">
            <SidebarMenu />
            <DashFooter />
          </div>
          
        </div>
      </div>
      {sidebar && <div onClick={() => dispatch(setSidebar(false))} className="fixed inset-0 z-20"></div>}
    </>
  );
};

export default Sidebar;