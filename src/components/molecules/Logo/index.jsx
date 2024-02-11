import React from 'react'
import { Link } from 'react-router-dom'

const Logo = ({variant, icon, text}) => {
  return (
    <Link className={`flex items-center ${variant} text-xl`} to="/">
      <i className={`text-2xl`}>{icon}</i>
      {text}
    </Link>
  )
}

export default Logo