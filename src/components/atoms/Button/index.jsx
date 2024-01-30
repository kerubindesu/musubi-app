import React from "react";

const Button = ({ type, variant, icon, text, disabled }) => {
  return (
    <>
      <button
        disabled={disabled}
        type={type}
        className={`px-[0.55rem] h-[2.4rem] w-full box-border flex justify-center items-center gap-1 rounded-md border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-300 focus:ring-0 whitespace-nowrap text-base ${variant}`}
      >
        <span className="text-lg">{icon}</span>
        <span>{text}</span>
      </button>
    </>
  );
};

export default Button;