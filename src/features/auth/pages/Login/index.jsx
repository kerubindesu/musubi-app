import React from 'react'
import { AuthHeader } from '../../../../components/organism'
import { LoginForm } from '../../components/organism'

const Login = () => {
  return (
    <div className="relative min-h-[100vh] max-w-screen overflow-x-hidden bg-gradient-to-b from-sky-800 to-sky-500 flex flex-col justify-center md:flex-row md:justify-end items-center">
      <AuthHeader />
      <LoginForm />
    </div>
  )
}

export default Login