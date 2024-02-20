import React from 'react'
import { NavLink } from 'react-router-dom'

const NavItem = ({ to, icon, text }) => {
  return (
    <>
      <NavLink
        to={to}
        className={({ isPending, isActive, isTransitioning }) => 
          `inline-block py-2 w-full md:w-auto box-border border-l-2 md:border-l-0 truncate font-semibold ${
            isPending ? 'text-slate-400' : ''
          } ${
            isActive ? 'border-slate-900' : 'text-slate-500'
          } ${
            isTransitioning ? 'transition-all duration-300 ease-in-out' : ''
          }`
        }
      >
        <div
          className={"py-[0.525rem] px-2 w-full flex items-center gap-4 md:rounded text-sm"}
        >
          {icon && <span className="p-1 rounded shadow-sm">{icon}</span>}
          <span>{text}</span>
        </div>
      </NavLink>
  </>
  )
}

export default NavItem