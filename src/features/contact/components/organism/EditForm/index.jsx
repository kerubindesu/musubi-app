import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, CustomTextArea, FloatingLabel, Loading} from "../../../../../components/atoms"
import {useDispatch} from "react-redux";
import {updateContact} from "../../../contactSlice";
import {RiImageAddLine, RiImageEditLine} from "react-icons/ri";
import { MyMap } from "../../../../../components/organism";

const EditForm = ({contact, isLoading}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [preview, setPreview] = useState("");

  console.log(contact?.location?.coordinates)

  useEffect(() => {
    if (contact) {
      setCompanyName(contact.company_name || "")
      setDescription(contact.description || "")
      setPreview(contact.img_url || "")
      setWhatsappNumber(contact.whatsapp_number || "")
      setEmail(contact.email || "")
      setAddress(contact.address || "")
      setLatitude(contact?.location?.coordinates[0] || "")
      setLongitude(contact?.location?.coordinates[1] || "")
   }
 }, [contact])

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
      await dispatch(updateContact({id, companyName, description, file, whatsappNumber, email, address, latitude, longitude, dispatch, navigate}))
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

          <FloatingLabel 
            id={"companyName"}
            type={"text"}
            text={"Company Name"}
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            variant={"border-b-0 rounded-t-lg"}
            htmlFor={"companyName"}
          />

          <CustomTextArea
            id="text"
            text={"Description"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            htmlFor={"description"}
            variant={"resize-none"}
            rows={5}
            cols={40}
          />

          <FloatingLabel 
            id={"whatsappNumber"}
            type={"text"}
            text={"Whatsapp Number"}
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            variant={"border-b-0 rounded-t-lg"}
            htmlFor={"whatsappNumber"}
          />

          <FloatingLabel 
            id={"email"}
            type={"email"}
            text={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant={"border-b-0 rounded-t-lg"}
            htmlFor={"email"}
          />

          <FloatingLabel 
            id={"address"}
            type={"text"}
            text={"Address"}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant={"border-b-0 rounded-t-lg"}
            htmlFor={"address"}
          />

          <FloatingLabel 
            id={"latitude"}
            type={"number"}
            text={"Latitude"}
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            variant={"border-b-0 rounded-t-lg"}
            htmlFor={"latitude"}
          />

          <FloatingLabel 
            id={"longitude"}
            type={"number"}
            text={"Longitude"}
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            variant={"border-b-0 rounded-t-lg"}
            htmlFor={"longitude"}
          />

          <MyMap
            latitude={contact?.location?.coordinates[0]}
            longitude={contact?.location?.coordinates[1]}
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