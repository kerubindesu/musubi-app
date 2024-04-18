/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, CustomTextArea, FloatingLabel, Loading } from "../../../../../components/atoms"
import { useDispatch, useSelector } from "react-redux";
import { getSEODataById, updateSEOData } from "../../../seoDataSlice";

const EditForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()
  const [keyword, setKeyword] = useState("");
  const [description, setDescription] = useState("");

  const { isLoading, seoDataById } = useSelector((state) => state.seoData);

  useEffect(() => {
    dispatch(getSEODataById({id, dispatch }));
  }, []);

  useEffect(() => {
    if (seoDataById) {
      setKeyword(seoDataById.keyword || "");
      setDescription(seoDataById.description || "");
    }
  }, [seoDataById])

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    try{
      await dispatch(updateSEOData({id, keyword, description, dispatch, navigate }))
    } catch (error) {
      if(error.response) {
          console.log(error)
          console.clear()
      }
    }
  }

  return (
    <div className="w-full">
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FloatingLabel 
            id={"keyword"}
            type={"text"}
            text={"Keyword"}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            variant={"border-b-0 rounded-t-lg"}
            htmlFor={"keyword"}
          />

          <CustomTextArea
            id="description"
            text={"Description"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            htmlFor={"description"}
            variant={"resize-none"}
            rows={3}
            cols={40}
          />

          <Button
            disabled={isLoading}
            type={"submit"} 
            variant={"bg-gradient-to-r from-sky-800 to-sky-700 shadow-lg text-white"}
            text={!isLoading && "Update"}
            icon={isLoading && <Loading />}
          />
        </form>
      </div>
    </div>
  );
};

export default EditForm;