import React from 'react';

const Placeholder = ({ variant }) => {
  return (
    <div
      className={`${variant} bg-gray-100 animate-pulse`}
    ></div>
  );
};

export default Placeholder;