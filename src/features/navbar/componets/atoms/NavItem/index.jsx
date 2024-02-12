import React from 'react'
import { NavLink } from 'react-router-dom'

const NavItem = ({ to, icon, text }) => {
  return (
    <>
    <NavLink
      to={to}
      className={({ isPending, isActive, isTransitioning }) => 
        `inline-block py-2 w-full md:w-auto box-border border-l-2 md:border-l-0 truncate ${
          isPending ? 'text-gray-500' : ''
        } ${
          isActive ? 'border-emerald-500 text-emerald-500' : 'text-gray-800'
        } ${
          isTransitioning ? 'transition-all duration-300 ease-in-out' : ''
        }`
      }
    >
        <div
          className={"py-[0.525rem] px-2 w-full flex items-center gap-4 hover:bg-slate-100 rounded text-base font-semibold"}
        >
          {icon && <span className="p-1 rounded shadow-sm">{icon}</span>}
          <span>{text}</span>
        </div>
      </NavLink>
    </>
  )
}

export default NavItem