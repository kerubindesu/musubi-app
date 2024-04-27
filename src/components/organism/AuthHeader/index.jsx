import React from 'react'
import { RiShieldUserLine } from 'react-icons/ri'

const AuthHeader = () => {
  return (
    <>
      <div className="flex-1 py-8 px-4 flex flex-col justify-center items-center gap-4 text-center md:gap-10 md:fixed top-0 right-[24rem] left-0 bottom-0">
          <h1 className="text-2xl text-slate-700">Welcome</h1>
          <div className="p-3 bg-white rounded-full flex flex-col jutify-center items-center">
            <RiShieldUserLine className="text-5xl" />
          </div>
          <p className="text-base text-slate-700 max-w-[30rem]">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem, velit. Voluptatem ducimus ipsum dolorem quia commodi.</p>
      </div>
    </>
  )
}

export default AuthHeader