import React, { useEffect, useState} from "react";
import { useNavigate, useParams} from "react-router-dom";
import { Button, CustomTextArea, FloatingLabel, Loading} from "../../../../../components/atoms"
import { useDispatch, useSelector} from "react-redux";
import { getCategory, updateCategory} from "../../../categoriesSlice";
import { RiImageAddLine, RiImageEditLine} from "react-icons/ri";

const EditForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  const {loading, category} = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategory({id, dispatch}));
 }, [id, dispatch]);

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setText(category.text || "");
      setPreview(category.img_url || "");
   }
 }, [category])

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
      await dispatch(updateCategory({id, name, text, file, dispatch, navigate}))
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
            id={"name"}
            type={"text"}
            text={"Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant={"border-b-0 rounded-t-lg"}
            htmlFor={"name"}
          />

          <CustomTextArea
            id="text"
            text={"Description"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            htmlFor={"text"}
            variant={"resize-none"}
            rows={3}
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
              <div className="mb-4 text-xs text-orange-400 font-semibold">Click the Image to change it.</div>
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