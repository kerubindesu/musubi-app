import React from 'react'
import { MenuList } from '../../components/organism'
import { HeadingTitle } from '../../../../components/atoms'

const Menus = () => {
  return (
    <div>
      <HeadingTitle variant={"text-2xl"} text={"Menus"} />
      <MenuList />
    </div>
  )
}

export default Menus