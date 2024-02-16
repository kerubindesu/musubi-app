import React from "react";
import { RiArticleLine, RiDashboardLine, RiFileUserLine, RiImageLine } from "react-icons/ri";
import { NavItem } from "../../atoms";
import { useDispatch } from "react-redux";
import { setSidebar } from "../../../sidebarSlice";

const SidebarMenu = () => {
  const dispatch = useDispatch()
  return (
    <>
      <ul className="flex-1 w-full flex flex-col">
        <div className="px-3">
          <NavItem
            action={() => dispatch(setSidebar(false))}
            variant={"px-2 rounded"}
            to={"/dash/home"}
            icon={<RiDashboardLine />}
            text={"Home"} />
          <NavItem
            action={() => dispatch(setSidebar(false))}
            variant={"px-2 rounded"}
            to={"/dash/posts"}
            icon={<RiArticleLine />}
            text={"Posts"}
          />
          <NavItem
            action={() => dispatch(setSidebar(false))}
            variant={"px-2 rounded"}
            to={"/dash/banners"}
            icon={<RiImageLine />}
            text={"Banners"} />
          <NavItem
            action={() => dispatch(setSidebar(false))}
            variant={"px-2 rounded"}
            to={"/dash/users"}
            icon={<RiFileUserLine />}
            text={"Users"}
          />
        </div>
        <li>
            <div className="pt-4 pb-3 pl-3 text-xs text-slate-500">Configurations</div>
            <ul className="px-3 flex flex-col justify-center items-start">
                <NavItem
                  action={() => dispatch(setSidebar(false))} variant={"py-3 pl-5 border-l-4 rounded-r"} to={"/dash/settings/logo"} text={"Logo"} />
                <NavItem
                  action={() => dispatch(setSidebar(false))} variant={"py-3 pl-5 border-l-4 rounded-r"} to={"/dash/settings/about"} text={"About"} />
                <NavItem
                  action={() => dispatch(setSidebar(false))} variant={"py-3 pl-5 border-l-4 rounded-r"} to={"/dash/settings/menus"} text={"Guest Menu"} />
            </ul>
        </li>
      </ul>
    </>
  );
};

export default SidebarMenu;