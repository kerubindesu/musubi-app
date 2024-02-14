import React from 'react';

const Placeholder = ({ width, height }) => {
  return (
    <div
      className={`h-[${height}] w-[${width}] bg-gray-300 animate-pulse`}
    ></div>
  );
};

export default Placeholder;