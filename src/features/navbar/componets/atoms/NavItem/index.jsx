import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { setNavBurgerMenu } from "../../../navbarSlice";

const NavItem = ({ to, icon, text }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { pathname } = location;

  return (
    <NavLink onClick={() => dispatch(setNavBurgerMenu(false))}
      to={to}
      className={({ isActive }) => `
        relative py-4 md:py-0 px-3 h-full w-full md:w-auto flex flex-col justify-center items-start md:items-center box-border truncate font-semibold text-slate-700 hover:bg-slate-100 md:hover:bg-inherit
        ${isActive ? "text-slate-900" : ""}
      `}
    >
      <div className="relative h-full flex max-w-max justify-center items-center gap-2">
        {icon && <span className="p-1 rounded shadow-sm">{icon}</span>}
        <span>{text}</span>

        <div className="absolute inset-0 hidden md:flex flex-col justify-end items-center">
          <div
            className={`h-1 w-full rounded-sm ${
              pathname === to ? "bg-slate-900" : "bg-transparent"
            }`}
          ></div>
        </div>
      </div>
    </NavLink>
  );
};

export default NavItem;
