import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { setImagePreview, setImgProperties } from "../../../imagePreviewSlice";
import { RiCloseLine } from 'react-icons/ri'

const ImagePreview = () => {
  const dispatch = useDispatch();

  const { imagePreview, imgProperties } = useSelector((state) => state.imagePreview);

  useEffect(() => {
    // Mengatur scroll body
    if (imagePreview) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
    
    return () => {
      enableBodyScroll(document.body);
    };
  }, [imagePreview]);

  const closePreview = () => {
    dispatch(setImagePreview(false));
    dispatch(setImgProperties([]));
  };

  return (
    <>
      {imagePreview && (
        <div onClick={closePreview} className="flex justify-center items-center fixed inset-0 z-50 bg-black/20">
          <div className="p-4 flex flex-col justify-center items-center">
            <div
              onClick={closePreview}
              className="absolute top-2 right-2 bg-slate-800/10 rounded-full text-white text-3xl font-semibold text-center cursor-pointer z-10"
            >
              <RiCloseLine />
            </div>
            <div onClick={(e) => e.stopPropagation()} className="max-w-3xl w-full bg-white rounded-sm shadow-lg overflow-hidden">
              <img src={imgProperties.url} alt={imgProperties.alt} className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreview;