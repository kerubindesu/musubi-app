import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FloatingLabel, Loading } from "../../../../../components/atoms"
import { useDispatch, useSelector } from "react-redux";
import { createTag } from "../../../tagsSlice";

const AddForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState("");

  const { loading } = useSelector((state) => state.tags);

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    try{
      await dispatch(createTag({ name, dispatch, navigate }))
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
            type={ "text" }
            text={ "Name" }
            value={ name }
            onChange={ (e) => setName(e.target.value) }
            variant={ "border-b-0 rounded-t-lg" }
            htmlFor={ "name" }
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