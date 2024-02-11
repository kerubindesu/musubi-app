import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const HeadingTitle = ({ text, variant, back }) => {
  const navigate = useNavigate()

  return (
    <div className={`${variant}`}>
      {back && back ? (
        <div onClick={() => navigate(-1)} className="flex flex-row text-slate-700 font-semibold cursor-pointer">
          <RiArrowLeftSLine className="-ml-2 text-2xl" />
          <h1 className={`${variant}`}>{text}</h1>
        </div>
      ) : (
        <div className="text-slate-700 font-semibold">
          <h1>{text}</h1>
        </div>
      )}
    </div>
  );
};

export default HeadingTitle;
