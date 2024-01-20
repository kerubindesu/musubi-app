import React from 'react'
import { Link } from 'react-router-dom'

const Logo = ({variant, icon}) => {
  return (
    <Link to="/">
      <i className={`text-2xl ${variant}`}>{icon}</i>
    </Link>
  )
}

export default Logo