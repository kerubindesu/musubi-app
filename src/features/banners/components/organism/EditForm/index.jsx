import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FloatingLabel, Loading } from "../../../../../components/atoms"
import { useDispatch, useSelector } from "react-redux";
import { getBanner, updateBanner } from "../../../bannersSlice";
import { RiImageAddLine, RiImageEditLine } from "react-icons/ri";

const EditForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  const { loading, banner } = useSelector((state) => state.banners);

  useEffect(() => {
    dispatch(getBanner({ id, dispatch }));
  }, [id, dispatch]);

  useEffect(() => {
    if (banner) {
      setTitle(banner.title)
      setText(banner.text)
      setPreview(banner.img_url)
    }
  }, [banner])

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
      await dispatch(updateBanner({ id, title, text, file, dispatch, navigate }))
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
          <div className="px-4 h-full min-h-[24rem] w-full bg-black/20 hover:bg-black/50 z-10 flex flex-col justify-center items-center rounded text-slate-200">
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
              <div className="text-base text-red-500">Klik gambar untuk mengubahnya.</div>
          )}

          <Button
            disabled={loading}
            type={"submit"} 
            variant={"bg-gradient-to-r from-sky-800 to-sky-700 shadow-lg text-white"}
            text={!loading && "Update"}
            icon={loading && <Loading />}
          />
        </form>
      </div>
    </div>
  );
};

export default EditForm;