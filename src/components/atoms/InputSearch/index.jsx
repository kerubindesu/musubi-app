import React from "react";
import { CgSearch } from "react-icons/cg";

const InputSearch = ({ variant, value, onChange, placeholder }) => {
  return (
    <>
      <form
        className={`px-2 w-full md:max-w-lg flex items-center justify-between gap-2 border border-slate-200 rounded ${variant}`}
      >
        <CgSearch className="text-slate-400 text-lg" />
        <input
          type="q"
          placeholder={placeholder}
          className="w-full py-[0.55rem] bg-bottom border-0 rounded focus:border-0 focus:outline-none focus:ring-0 text-sm"
          value={value}
          onChange={onChange}
          autoFocus={true}
        />
      </form>
    </>
  );
};

export default InputSearch;
