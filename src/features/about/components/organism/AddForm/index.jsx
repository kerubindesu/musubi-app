import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FloatingLabel, Loading } from "../../../../../components/atoms"
import { useDispatch, useSelector } from "react-redux";
import { createAbout } from "../../../aboutSlice";
import { RiImageAddLine, RiImageEditLine } from "react-icons/ri";

const AddForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [maps, setMaps] = useState("");
  const [preview, setPreview] = useState("");

  const { loading } = useSelector((state) => state.about);

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
      await dispatch(createAbout({ title, text, file, maps, dispatch, navigate }))
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
            type={ "text" }
            text={ "Title" }
            value={ title }
            onChange={ (e) => setTitle(e.target.value) }
            variant={ "border-b-0 rounded-t-lg" }
            htmlFor={ "title" }
          />

          <FloatingLabel 
            id={"text"}
            type={ "text" }
            text={ "Text" }
            value={ text }
            onChange={ (e) => setText(e.target.value) }
            variant={ "border-b-0 rounded-t-lg" }
            htmlFor={ "text" }
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
          <div className="px-4 min-h-[10rem] w-full bg-black/20 hover:bg-black/50 z-10 flex flex-col justify-center items-center rounded text-white">
            { preview ? <RiImageEditLine className="text-3xl" /> : <RiImageAddLine className="text-3xl" /> }
            <span className="mt-2 text-base leading-normal">
              { preview ? "Change image" : "Select a image"}
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
              <div className="text-base text-orange-400 font-semibold">Click the Image to change it.</div>
          )}

          <FloatingLabel 
            id={"maps"}
            type={ "text" }
            text={ "Maps" }
            value={ maps }
            onChange={ (e) => setMaps(e.target.value) }
            variant={ "border-b-0 rounded-t-lg" }
            htmlFor={ "maps" }
          />

          <Button
            disabled={loading}
            type={"submit"} 
            variant={"bg-gradient-to-r from-sky-800 to-sky-700 shadow-lg text-white"}
            text={!loading && "Save"}
            icon={loading && <Loading />}
          />
        </form>
      </div>
    </div>
  );
};

export default AddForm;