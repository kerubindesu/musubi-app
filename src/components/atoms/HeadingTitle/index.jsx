import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const HeadingTitle = ({ text, variant, back }) => {
  const navigate = useNavigate()

  return (
    <>
      {back && back ? (
        <div onClick={() => navigate(-1)} className="mb-8 flex flex-row text-slate-700 font-semibold cursor pointer">
          <RiArrowLeftSLine className="-ml-2 text-2xl" />
          <h1 className={`${variant}`}>{text}</h1>
        </div>
      ) : (
        <div className="mb-8 text-slate-700 font-semibold">
          <h1 className={`${variant}`}>{text}</h1>
        </div>
      )}
    </>
  );
};

export default HeadingTitle;
