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
          <div className="relative container p-4 max-w-3xl h-full flex flex-col justify-center items-center">
            <div onClick={(e) => e.stopPropagation()} className="relative container mx-auto h-max max-w-3xl bg-black rounded-sm">
              <img src={imgProperties.url} alt={imgProperties.alt} className="w-full h-full object-contain" />
            </div>
            <div
                onClick={closePreview}
                className="absolute top-5 -right-8 h-10 w-10 bg-white border rounded-full shadow-lg flex justify-center items-center text-black cursor-pointer z-50"
              >
                <RiCloseLine className="text-3xl" />
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreview;