import React, { useEffect } from 'react'
import { NavItem } from '../../atoms'
import { useDispatch, useSelector } from 'react-redux';
import { getMenus } from '../../../../menus/menusSlice';
import { Placeholder } from '../../../../../components/atoms';

const NavMenu = ({ variant }) => {
  const dispatch = useDispatch()

  const { menus, loading } = useSelector((state) => state.menus);

  useEffect(() => {
    dispatch(getMenus({ search: "", limit: "", page: "" }))
  }, [dispatch])

  return (
    <>
      <div className={`${variant} h-full w-full`}>
        {menus && menus?.map((menu, index) => (
          <NavItem key={index + 1} to={menu.link} text={menu.name.charAt(0).toUpperCase() + menu.name.slice(1)} />
        ))}

        {loading && <Placeholder variant={"h-full w-full max-h-[2.5rem] rounded-lg"} />}
      </div>
    </>
  )
}

export default NavMenu