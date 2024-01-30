import React from 'react'
import { Spinner } from 'flowbite-react';

const Loading = ({ text }) => {
  return (
    <div className="p-2 flex justify-center items-center gap-2">
      <Spinner color="warning" />
      {text && text ? "Loading..." : ""}
    </div>
  )
}

export default Loading