import React, { useEffect } from 'react'
import { NavItem } from '../../atoms'
import { useDispatch, useSelector } from 'react-redux';
import { getMenus } from '../../../../menus/menusSlice';
import { Placeholder } from '../../../../../components/atoms';

const NavMenu = ({ variant }) => {
  const dispatch = useDispatch()

  const { menus, isLoading } = useSelector((state) => state.menus);
  console.log(isLoading)

  useEffect(() => {
    dispatch(getMenus({ search: "", limit: "", page: "" }))
  }, [dispatch])

  return (
    <>
      <div className={`${variant} h-full w-full`}>
        {isLoading ? (
          <>
            <Placeholder variant={"hidden md:block h-[2.5rem] w-full rounded-lg"} />

            <div className="px-3 w-full flex flex-col gap-4 md:hidden">
              <Placeholder variant={"h-8 w-full rounded-lg"} />
              <Placeholder variant={"h-8 w-full rounded-lg"} />
              <Placeholder variant={"h-8 w-full rounded-lg"} />
              <Placeholder variant={"h-8 w-full rounded-lg"} />
              <Placeholder variant={"h-8 w-full rounded-lg"} />
              <Placeholder variant={"h-8 w-full rounded-lg"} />
              <Placeholder variant={"h-8 w-full rounded-lg"} />
              <Placeholder variant={"h-8 w-full rounded-lg"} />
              <Placeholder variant={"h-8 w-full rounded-lg"} />
              <Placeholder variant={"h-8 w-full rounded-lg"} />
            </div>
          </>
        ) : (
          <>
            {menus && menus?.map((menu, index) => (
              <NavItem key={index + 1} to={menu.link} text={menu.name.charAt(0).toUpperCase() + menu.name.slice(1)} />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default NavMenu