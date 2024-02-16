import React from 'react';

const Placeholder = ({ variant }) => {
  return (
    <div
      className={`${variant} bg-gray-300 animate-pulse`}
    ></div>
  );
};

export default Placeholder;