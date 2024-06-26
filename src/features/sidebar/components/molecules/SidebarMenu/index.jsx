import React from "react";
import { RiArticleLine, RiDashboardLine, RiFileUserLine, RiImageLine, RiListIndefinite, RiPriceTag3Line } from "react-icons/ri";
import { NavItem } from "../../atoms";
import { useDispatch } from "react-redux";
import { setSidebar } from "../../../sidebarSlice";

const SidebarMenu = () => {
  const dispatch = useDispatch()
  return (
    <>
      <ul className="flex-1 w-full flex flex-col">
        <div className="p-3 border-b">
          <NavItem
            action={() => dispatch(setSidebar(false))}
            variant={"px-2 rounded-md"}
            to={"/dash/home"}
            icon={<RiDashboardLine />}
            text={"Home"} />
          <NavItem
            action={() => dispatch(setSidebar(false))}
            variant={"px-2 rounded-md"}
            to={"/dash/products"}
            icon={<RiArticleLine />}
            text={"Products"}
          />
          <NavItem
            action={() => dispatch(setSidebar(false))}
            variant={"px-2 rounded-md"}
            to={"/dash/categories"}
            icon={<RiListIndefinite />}
            text={"Categories"}
          />
          <NavItem
            action={() => dispatch(setSidebar(false))}
            variant={"px-2 rounded-md"}
            to={"/dash/carousels"}
            icon={<RiImageLine />}
            text={"Carousels"} />
          <NavItem
            action={() => dispatch(setSidebar(false))}
            variant={"px-2 rounded-md"}
            to={"/dash/users"}
            icon={<RiFileUserLine />}
            text={"Users"}
          />
          <NavItem
            action={() => dispatch(setSidebar(false))}
            variant={"px-2 rounded-md"}
            to={"/dash/tags"}
            icon={<RiPriceTag3Line />}
            text={"Tags"}
          />
        </div>
        <li className="py-3">
            <div className="pt-4 pb-3 pl-3 text-xs text-slate-500">Configuration</div>
            <ul className="px-3 flex flex-col justify-center items-start">
                <NavItem
                  action={() => dispatch(setSidebar(false))} variant={"py-3 pl-4 border-l-4 rounded-r-md"} to={"/dash/logo"} text={"Logo"}
                />
                <NavItem
                  action={() => dispatch(setSidebar(false))} variant={"py-3 pl-4 border-l-4 rounded-r-md"} to={"/dash/contact"} text={"Contact"}
                />
                <NavItem
                  action={() => dispatch(setSidebar(false))} variant={"py-3 pl-4 border-l-4 rounded-r-md"} to={"/dash/menus"} text={"Navigation Menu"}
                />
                <NavItem
                  action={() => dispatch(setSidebar(false))} variant={"py-3 pl-4 border-l-4 rounded-r-md"} to={"/dash/seo-management"} text={"SEO Management"}
                />
            </ul>
        </li>
      </ul>
    </>
  );
};

export default SidebarMenu;