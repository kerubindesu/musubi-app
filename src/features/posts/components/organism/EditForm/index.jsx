/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, CustomSelect, CustomTextArea, FloatingLabel, Loading } from "../../../../../components/atoms"
import { useDispatch, useSelector } from "react-redux";
import { getPost, updatePost } from "../../../postsSlice";
import { RiImageAddLine, RiImageEditLine } from "react-icons/ri";
import { getCategories } from "../../../../categories/categoriesSlice";
import { getTags } from "../../../../tags/tagsSlice";

const EditForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [preview, setPreview] = useState("");

  const { loading, post } = useSelector((state) => state.posts);
  const { categories } = useSelector((state) => state.categories);
  const { tags } = useSelector((state) => state.tags);

  useEffect(() => {
    dispatch(getPost({id, dispatch }));
    dispatch(getCategories({search: "", limit: "", page: "" }))
    dispatch(getTags({search: "", limit: "", page: "" }))
  }, []);

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setText(post.text || "");
      setPreview(post.img_url || "");
      setCategory({value: post?.category?._id, label: post?.category?.name } || "");
      setSelectedTags(post?.tags?.map(tag => ({value: tag._id, label: tag.name})) || [])
    }
  }, [post])

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

    // ambil value dari state selectedTags jika ada
    const selectedTagsValues = selectedTags ? selectedTags?.map(tag => tag.value) : []
    
    try{
      await dispatch(updatePost({id, title, text, category: category.value || "", tags: selectedTagsValues, file, dispatch, navigate }))
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
            value={text}
            onChange={(e) => setText(e.target.value)}
            htmlFor={"text"}
            variant={"resize-none"}
            rows={3}
            cols={40}
          />

          <div className="w-full flex flex-col justify-start items-start gap-2 text-base">
            <label htmlFor="file-upload" className="relative w-full flex flex-col items-center bg-white/90 border rounded shadow-sm hover:shadow-none cursor-pointer overflow-hidden box-border">
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
              <div className="text-base text-orange-400 font-semibold">Click the Image to change it.</div>
            )}
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-2 text-base">
            <span>Category</span>
            <CustomSelect
              options={categories.map(category => ({value: category._id, label: category.name }))}
              value={category ? {value: category.value, label: category.label} : null}
              onChange={(selectedOption) => setCategory(selectedOption ? selectedOption : null)}
              placeholder="Select Category"
              menuPlacement="top"
              getOptionValue={(option) => option.value}
            />
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-2 text-base">
            <span>Tags</span>
            <CustomSelect
              options={ tags.map(tag => ({value: tag._id, label: tag.name })) }
              value={selectedTags}
              onChange={(selectedOptions) => {
                setSelectedTags(Array.isArray(selectedOptions) ? selectedOptions.map(option => option) : [])
              }}
              placeholder="Select Tags"
              menuPlacement="top"
              isMulti={true}
              getOptionValue={(option) => option.value}
            />
          </div>

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