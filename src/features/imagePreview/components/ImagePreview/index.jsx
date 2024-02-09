import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { setImagePreview, setimgProperties } from "../../imagePreviewSlice";
import { RiCloseLine } from 'react-icons/ri'

const ImagePreview = () => {
  const dispatch = useDispatch();

  const { imagePreview, imgProperties } = useSelector((state) => state.imagePreview);

  if (imagePreview) {
    disableBodyScroll(document)
  } else {
    enableBodyScroll(document)
  }

  return (
    <>
      <div
        className={`${
          imagePreview ? "flex" : "hidden"
        } flex justify-center items-center overflow-hidden fixed inset-0 z-50`}
      >
        <div className="p-4 absolute inset-0 flex justify-center items-center">
          <div
            onClick={() =>{
              dispatch(setImagePreview(false))
              dispatch(setimgProperties([]))
            }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          ></div>
          <div className="relative w-full max-w-3xl flex flex-col justify-center items-center bg-black rounded-sm shadow">
            <div onClick={() => {
                dispatch(setImagePreview(false))
                dispatch(setimgProperties([]))
              }}
              className="absolute top-2 right-2 bg-slate-800/10 rounded text-white text-3xl font-semibold text-center cursor-pointer z-10"
            >
                <RiCloseLine />
            </div>
            <figure className={`w-full object-cover`}>
              <img src={imgProperties.url} alt={imgProperties.alt} />
            </figure>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImagePreview;