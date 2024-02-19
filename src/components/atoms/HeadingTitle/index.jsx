import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const HeadingTitle = ({ mainVariant, text, variant, back }) => {
  const navigate = useNavigate()

  return (
    <div className={`${mainVariant || "mb-4"}`}>
      {back && back ? (
        <div onClick={() => navigate(-1)} className="py-2.5 max-w-fit flex flex-row justify-start items-center text-slate-700 font-semibold cursor-pointer rounded">
          <RiArrowLeftSLine className="-ml-2 text-2xl" />
          <span className={`${variant}`}>{text}</span>
        </div>
      ) : (
        <div className="py-2.5 text-slate-700 font-semibold">
          <span className={`${variant}`}>{text}</span>
        </div>
      )}
    </div>
  );
};

export default HeadingTitle;
