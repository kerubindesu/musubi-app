import React from 'react'
import { NavItem } from '../../atoms'

const NavMenu = ({ variant }) => {
  return (
    <div className={`${variant} w-full`}>
      <NavItem to={"/"} text={"Home"} />
      <NavItem to={"/products"} text={"Products"} />
      <NavItem to={"/system"} text={"System"} />
      <NavItem to={"/about"} text={"About"} />
    </div>
  )
}

export default NavMenu