import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLogo, updateLogo } from '../../../logoSlice'
import { RiImageAddLine, RiImageEditLine } from 'react-icons/ri'
import { Button, Loading } from '../../../../../components/atoms'

const LogoSettingsForm = () => {
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    const [file, setFile] = useState()
    const [preview, setPreview] = useState()

    const { loading, logo } = useSelector((state) => state.logo);

    useEffect(() => {
        dispatch(getLogo())
    }, [dispatch])

    useEffect(() => {
        if (logo) {
            setPreview(logo.img_url)
        }
    }, [logo])

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

        await dispatch(updateLogo({ file, dispatch }))
    }

    return (
    <div className="w-full">
        <div className="w-full max-w-sm">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {preview && (
                    <div className="text-base text-red-500">*Klik Gambar untuk mengubahnya.</div>
                )}
                <label htmlFor="file-upload" className="relative flex flex-col items-center bg-white/90 border rounded shadow-sm hover:shadow-none cursor-pointer overflow-hidden box-border">
                    {preview ? (
                        <figure className="absolute inset-0 flex flex-col items-center justify-center">
                        <img
                            className="w-full object-cover"
                            src={preview}
                            alt="Preview"
                        />
                        </figure>
                    ) : (
                        ""
                    )}
                    <div className="px-4 h-full min-h-[24rem] w-full bg-black/20 hover:bg-black/50 z-10 flex flex-col justify-center items-center rounded text-white">
                        { preview ? <RiImageEditLine className="text-3xl" /> : <RiImageAddLine className="text-3xl" /> }
                        <span className="mt-2 text-base leading-normal">
                        { preview ? "Change logo" : "Select a image"}
                        </span>
                    </div>
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={loadImage}
                    />
                </label>

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
    )
}

export default LogoSettingsForm