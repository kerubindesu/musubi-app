import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      Footer
      <Link to="login" className="text-blue-500 cursor-pointer">Login</Link>
    </div>
  )
}

export default Footer