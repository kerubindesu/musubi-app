import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine, RiMenuLine } from "react-icons/ri";
import { SidebarMenu } from "../../molecules";
import { DashFooter } from "../../../../../components/organism";
import { Logo, Placeholder } from "../../../../../components/atoms";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuth, logout } from "../../../../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { setSidebar } from "../../../sidebarSlice";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)

  const { userAuth, loading: AuthLoading, error: errAuth, errRefreshToken } = useSelector((state) => state.auth);
  const { sidebar } = useSelector((state) => state.sidebar);

  useEffect(() => {
    dispatch(getUserAuth())
  }, [dispatch])

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
        fixed z-30 inset-0 top-0 left-0 right-auto w-[14rem] lg:flex flex-col justify-between overflow-x-hidden overflow-y-hidden font-semibold leading-6 bg-white`
      }>
        <div className="w-full h-full flex flex-col justify-start items-start">

          <div className="relative px-3 h-16 w-full flex justify-start items-center gap-2 lg:border-r border-b">
            <div onClick={() => dispatch(setSidebar(!sidebar))} className="lg:hidden h-10 w-10 flex justify-center items-center rounded-full hover:bg-slate-200 focus:bg-slate-100 cursor-pointer">
              <RiMenuLine className="text-2xl" />
            </div>
            <Logo variant="max-h-[2.5rem]" />
          </div>

          <div className="px-3 py-3 w-full flex flex-col justify-center items-start gap-4 border-b truncate box-border border-r">

            {AuthLoading ? <Placeholder variant={"h-[2.8rem] w-full"} /> : (
              <>
                <div className="w-full flex flex-row justify-between items-center">
                  <div className="max-w-[10rem] truncate">
                    <div className="text-base truncate">{userAuth?.name}</div>
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
                  <div className="px-4 h-10 w-full flex justify-center items-center gap-2 hover:bg-slate-100 shadow-lg text-gray-700 rounded-sm cursor-pointer border" onClick={handleLogout}>
                    <span className="text-base">Logout</span>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="pt-3 flex-1 w-full flex flex-col justify-between overflow-y-auto no-scrollbar border-r">
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