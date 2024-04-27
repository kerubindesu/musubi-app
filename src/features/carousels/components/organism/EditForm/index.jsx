import React, { useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, CustomTextArea, FloatingLabel, Loading} from "../../../../../components/atoms"
import {useDispatch, useSelector} from "react-redux";
import {getCarousel, updateCarousel} from "../../../carouselsSlice";
import {RiImageAddLine, RiImageEditLine} from "react-icons/ri";

const EditForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  const {isLoading, carousel} = useSelector((state) => state.carousels);

  useEffect(() => {
    dispatch(getCarousel({id, dispatch}));
 }, [id, dispatch]);

  useEffect(() => {
    if (carousel) {
      setTitle(carousel.title || "")
      setDescription(carousel.description || "")
      setPreview(carousel.img_url || "")
   }
 }, [carousel])

  const loadImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      setFile(image);
      try {
          setPreview(URL.createObjectURL(image));
     } catch (error) {
          console.error('Error creating object URL:', error);
     }
   }
 };

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    try{
      await dispatch(updateCarousel({id, title, description, file, dispatch, navigate}))
   } catch (error) {
      if(error.response) {
          console.log(error)
     }
   }
 }

  return (
    <div className="w-full">
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FloatingLabel 
            id={"title"}
            type={"text"}
            text={"Title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant={"border-b-0 rounded-t-lg"}
            htmlFor={"title"}
          />

          <CustomTextArea
            id="text"
            text={"Description"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            htmlFor={"description"}
            variant={"resize-none"}
            rows={5}
            cols={40}
          />

          <label htmlFor="file-upload" className="relative flex flex-col items-center bg-white/90 border rounded shadow-sm hover:shadow-none cursor-pointer overflow-hidden box-border">
          {preview ? (
            <figure className="absolute inset-0">
              <img
                className="w-full h-full object-cover"
                src={preview}
                alt="Preview"
              />
            </figure>
          ) : (
            ""
          )}
          <div className="px-4 min-h-[10rem] w-full bg-black/20 hover:bg-black/50 z-10 flex flex-col justify-center items-center rounded text-slate-200">
            {preview ? <RiImageEditLine className="text-3xl" /> : <RiImageAddLine className="text-3xl" />}
            <span className="mt-2 text-base leading-normal">
              {preview ? "Change image" : "Select a image"}
            </span>
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={loadImage}
          />
          </label>

          {preview && (
              <div className="mb-4 text-xs text-orange-400">Click the Image to change it.</div>
          )}

          <Button
            disabled={isLoading}
            type={"submit"} 
            variant={"bg-slate-700 shadow-lg text-white"}
            text={!isLoading && "Update"}
            icon={isLoading && <Loading text={true} />}
          />
        </form>
      </div>
    </div>
  );
};

export default EditForm;