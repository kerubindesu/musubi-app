import React from "react"
import { NavLink } from "react-router-dom"

const NavItem = ({ action, to, icon, text, variant }) => {
  return (
    <>
      <NavLink
        onClick={action}
        to={to}
        className={({ isPending, isActive, isTransitioning }) => 
          `py-1 w-full flex justify-start items-center box-border truncate hover:bg-slate-100 focus:bg-slate-100 text-sm font-semibold ${variant} ${
            isPending ? "text-slate-500" : ""
          } ${
            isActive ? "bg-slate-100 border-black text-black" : "text-slate-800"
          } ${
            isTransitioning ? "transition-all duration-300 ease-in-out" : ""
          }`
        }
      >
        <div className={"w-full flex items-center gap-2"}>
          {icon && <div className="h-10 w-10 flex justify-center items-center text-2xl">{icon}</div>}
          <div>{text}</div>
        </div>
      </NavLink>
  </>
  )
}

export default NavItem