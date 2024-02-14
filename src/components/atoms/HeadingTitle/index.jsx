import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const HeadingTitle = ({ marginBottom, text, variant, back }) => {
  const navigate = useNavigate()

  return (
    <div className={`${marginBottom || "mb-4"}`}>
      {back && back ? (
        <div onClick={() => navigate(-1)} className="max-w-fit flex flex-row justify-start items-center text-slate-700 font-semibold cursor-pointer rounded">
          <RiArrowLeftSLine className="-ml-3 text-4xl" />
          <h1 className={`${variant}`}>{text}</h1>
        </div>
      ) : (
        <div className="text-slate-700 font-semibold">
          <h1 className={`${variant}`}>{text}</h1>
        </div>
      )}
    </div>
  );
};

export default HeadingTitle;
