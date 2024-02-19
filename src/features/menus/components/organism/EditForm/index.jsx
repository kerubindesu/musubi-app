import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, FloatingLabel, Loading} from "../../../../../components/atoms"
import {useDispatch, useSelector} from "react-redux";
import {getMenu, updateMenu} from "../../../menusSlice";

const EditForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [icon, setIcon] = useState("");

  const {loading, menu} = useSelector((state) => state.menus);

  useEffect(() => {
    dispatch(getMenu({id, dispatch}));
 }, [id, dispatch]);

  useEffect(() => {
    if (menu) {
      setName(menu.name || "")
      setLink(menu.link || "")
      setIcon(menu.icon || "")
   }
 }, [menu])

  const handleSubmit = async(e) => {
    e.preventDefault()
    
    try{
      await dispatch(updateMenu({id, name, link, icon, dispatch, navigate}))
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

          <FloatingLabel 
            id={"link"}
            type={"text"}
            text={"Link"}
            value={link}
            onChange={(e) => setLink(e.target.value)}
            variant={"border-b-0 rounded-t-lg"}
            htmlFor={"link"}
          />

          <FloatingLabel 
            id={"icon"}
            type={"text"}
            text={"Icon"}
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            variant={"border-b-0 rounded-t-lg"}
            htmlFor={"icon"}
          />

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