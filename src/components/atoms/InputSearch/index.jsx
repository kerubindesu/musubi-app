import React from "react";
import { RiSearchLine } from "react-icons/ri";

const InputSearch = ({ variant, value, onChange, placeholder }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`px-2 w-full flex items-center justify-between gap-2 border border-slate-200 rounded ${variant} bg-white`}
    >
      <RiSearchLine className="text-slate-400 text-lg" />
      <input
        type="q"
        placeholder={placeholder}
        className="w-full py-[0.55rem] bg-bottom border-0 rounded focus:border-0 focus:outline-none focus:ring-0 text-sm"
        value={value}
        onChange={onChange}
        autoFocus={true}
      />
    </form>
  );
};

export default InputSearch;
