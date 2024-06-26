import React from "react";

const CustomTextArea = ({
  value,
  id,
  htmlFor,
  text,
  onChange,
  variant,
  cols,
  rows
}) => {
  return (
    <>
      <div className={`relative z-0 mb-6 w-full group text-base ${variant}`}>
        <textarea
          value={value}
          id={id}
          onChange={onChange}
          className="block py-2.5 px-0 w-full text-slate-900 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-slate-500 peer"
          placeholder={" "}
          autoComplete="off"
          cols={cols}
          rows={rows}
        />
        <label
          htmlFor={htmlFor}
          className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-slate-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {text}
        </label>
      </div>
    </>
  );
};

export default CustomTextArea;
