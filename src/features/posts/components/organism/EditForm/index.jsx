import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FloatingLabel, Loading } from "../../../../../components/atoms"
import { useDispatch, useSelector } from "react-redux";
import { getPost, updatePost } from "../../../postsSlice";
import { RiImageAddLine, RiImageEditLine, RiInformationLine } from "react-icons/ri";

const EditForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  const { loading, post, error: errPost } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setText(post.text)
      setPreview(post.img_url)
    }
  }, [post])

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    try{
      await dispatch(updatePost({ id, title, text, file, navigate }))
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
          <div className="py-6 px-4 h-full w-full bg-black/20 hover:bg-black/50 z-10 flex flex-col justify-center items-center rounded text-slate-200">
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

          { errPost && errPost ? (
              <div className="w-full flex items-center gap-1 text-red-500 text-base font-semibold">
                <RiInformationLine className="text-xl" /> { `${errPost.message}` }
              </div>
          ) : (
              ""
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