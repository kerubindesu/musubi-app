/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, CustomTextArea, FloatingLabel, Loading} from "../../../../../components/atoms"
import {useDispatch, useSelector} from "react-redux";
import {createSEOData} from "../../../seoDataSlice";

const AddForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [keyword, setKeyword] = useState("");
  const [description, setDescription] = useState("");

  const {isLoading} = useSelector((state) => state.seoData);

  const handleSubmit = async(e) => {
    e.preventDefault()

    try{
      await dispatch(createSEOData({ keyword, description, dispatch, navigate }))
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
            rows={1}
            cols={40}
          />
          
          <Button
            disabled={isLoading}
            type={"submit"} 
            variant={"bg-slate-700 shadow-lg text-white"}
            text={!isLoading && "Save"}
            icon={isLoading && <Loading text={true} />}
          />
        </form>
      </div>
    </div>
  );
};

export default AddForm;