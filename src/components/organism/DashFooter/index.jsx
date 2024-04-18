import React from 'react'
import { Link } from 'react-router-dom'

const DashFooter = () => {
  const content = (
    <footer className="p-4 w-full flex items-center gap-1 text-xs text-slate-700 truncate">
      <p className="font-normal">Develop by</p>
      <Link
        className="font-semibold truncate"
        to="https://github.com/kerubindesu/"
        target="_blank"
      >
          Kerubindesu
      </Link>
    </footer>
  )
  return content
}

export default DashFooter