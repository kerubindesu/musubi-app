import React from 'react';

const Placeholder = ({ variant }) => {
  return (
    <div
      className={`${variant} bg-slate-200 animate-pulse`}
    ></div>
  );
};

export default Placeholder;