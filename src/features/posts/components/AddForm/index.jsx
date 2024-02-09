import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FloatingLabel, Loading } from "../../../../components/atoms"
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../postsSlice";
import { getUserAuth } from "../../../auth/authSlice";

const AddProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [user, setUser] = useState("")
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");

  console.log(user)
  console.log(title)
  console.log(text)
  console.log(file)


  const { loading } = useSelector((state) => state.posts);
  const { userAuth } = useSelector((state) => state.auth);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    try{
      await dispatch(createPost({ user, title, text, file, navigate }))
    } catch (error) {
      if(error.response) {
          console.log(error)
      }
    }
  }

  useEffect(() => {
    dispatch(getUserAuth())
  }, [dispatch])

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

          <label htmlFor="file-upload" className="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.305 4.332C6.665 3.544 7.578 3 8.608 3h2.784c1.03 0 1.943.544 2.303 1.332l1.912 4.038A1 1 0 0 1 15.607 10H17a1 1 0 0 1 0 2h-1.393a1 1 0 0 1-.99-.832L14 8H6l-.617 3.168A1 1 0 0 1 4.393 11H3a1 1 0 0 1-.94-1.34l1.912-4.038zM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
              />
            </svg>
            <span className="mt-2 text-base leading-normal">Select a file</span>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={loadImage}
            />
          </label>

          {preview ? (
            <figure className="w-full">
              <img
                className="w-full h-full"
                src={preview}
                alt="Preview"
              />
            </figure>
          ) : (
            ""
          )}

          <Button
            onClick={() => setUser(userAuth.username)}
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

export default AddProduct;