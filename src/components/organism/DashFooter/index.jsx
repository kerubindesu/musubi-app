import React from 'react'
import { RiHome8Line } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';

const DashFooter = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onGoHomeClicked = () => navigate("/dash")

  let goHomeButton = null
  if (pathname !== "/dash") {
    goHomeButton = (
      <button onClick={(e) => {
        e.preventDefault(); 
        onGoHomeClicked();
      }}>
        <RiHome8Line />
      </button>
    )
  }

  const content = (
    <footer>
      { goHomeButton }
      <p>Current user: </p>
      <p>Status: </p>
    </footer>
  )
  return content
}

export default DashFooter