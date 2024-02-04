import React from "react";

const HeadingTitle = ({ text, variant }) => {
  return (
    <>
      <span>
        <h1 className={`text-slate-700 font-semibold ${variant}`}>{text}</h1>
      </span>
    </>
  );
};

export default HeadingTitle;
