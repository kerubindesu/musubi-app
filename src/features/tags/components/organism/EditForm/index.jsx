import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, FloatingLabel, Loading} from "../../../../../components/atoms"
import {useDispatch, useSelector} from "react-redux";
import {getTag, updateTag} from "../../../tagsSlice";

const EditForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  
  const [name, setName] = useState("");

  const {isLoading, tag} = useSelector((state) => state.tags);

  useEffect(() => {
    dispatch(getTag({id, dispatch}));
 }, [id, dispatch]);

  useEffect(() => {
    if (tag) {
      setName(tag.name || "")
   }
 }, [tag])

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    try{
      await dispatch(updateTag({id, name, dispatch, navigate}))
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