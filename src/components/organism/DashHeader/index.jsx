import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Logo } from '../../atoms';
import { RiMenuLine } from 'react-icons/ri';
import { setSidebar } from '../../../features/sidebar/sidebarSlice';


const DashHeader = () => {
  const dispatch = useDispatch()

  const { sidebar } = useSelector((state) => state.sidebar);

  return (
    <div className="md:hidden fixed top-0 px-3 h-16 w-full z-20 flex justify-start items-center gap-2 bg-white border-b">
      <div onClick={() => dispatch(setSidebar(!sidebar))} className="h-10 w-10 flex justify-center items-center cursor-pointer">
        <RiMenuLine className="text-2xl" />
      </div>
      <Logo link={"/dash/home"} variant="max-h-[2.5rem]" />
    </div>
  )
}

export default DashHeader