import React from "react";

const Button = ({ type, variant, icon, text, disabled, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled}
        type={type}
        className={`px-8 h-[2.4rem] w-full box-border flex justify-center items-center gap-2 rounded-md border-slate-300 placeholder-slate-400 focus:outline-none focus:border-slate-300 focus:ring-0 whitespace-nowrap text-base ${variant}`}
      >
        <span className="-ml-2 text-lg">{icon}</span>
        <span>{text}</span>
      </button>
    </>
  );
};

export default Button;