import React, { useState, useEffect } from 'react';
import { Button, FloatingLabel, Loading } from '../../../../../components/atoms';
import { RiImageAddLine, RiImageEditLine, RiInformationLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { getSetting, updateSetting } from '../../../settingsSlice';
import { useNavigate } from 'react-router-dom';

const SettingsForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [preview, setPreview] = useState("");
    const [theme, setTheme] = useState("");
    const [primary, setPrimary] = useState("");
    const [secondary, setSecondary] = useState("");
    const [background, setBackground] = useState("");
    const [text, setText] = useState("");
    const [file, setFile] = useState("");
    const [description, setDescription] = useState("");
    const [siteName, setSiteName] = useState("");
    const [siteDescription, setSiteDescription] = useState("");
    const [keywords, setKeywords] = useState("");
    const [emailServer, setEmailServer] = useState("");
    const [port, setPort] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [senderEmail, setSenderEmail] = useState("");
    
    const { loading, settings, error: errSettings } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getSetting());
        }, [dispatch]);

        useEffect(() => {
        if (settings) {
            setTheme(settings.theme)
            setPrimary(settings?.color_palette?.primary)
            setSecondary(settings?.color_palette?.secondary)
            setBackground(settings?.color_palette?.background)
            setText(settings?.color_palette?.text)
            setDescription(settings.description)
            setSiteName(settings.site_name)
            setSiteDescription(settings.site_description)
            setKeywords(settings.keywords)
            setEmailServer(settings.email_server)
            setPort(settings.port)
            setUsername(settings.username)
            setSenderEmail(settings.sender_email)
            setPreview(settings.logo_url)
        }
    }, [settings])

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    };

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        try{
            await dispatch(updateSetting({ 
                theme,
                primary,
                secondary,
                background,
                text,
                file,
                description,
                siteName,
                siteDescription,
                keywords,
                emailServer,
                port,
                username,
                password,
                senderEmail,
                navigate 
            }))
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
                    id={"theme"}
                    type={ "text" }
                    text={ "Theme" }
                    value={ theme }
                    onChange={ (e) => setTheme(e.target.value) }
                    variant={ "border-b-0 rounded-t-lg" }
                    htmlFor={ "theme" }
                />

                <div>Color Palette</div>

                <FloatingLabel 
                    id={"primary"}
                    type={ "text" }
                    text={ "Primary" }
                    value={ primary }
                    onChange={ (e) => setPrimary(e.target.value) }
                    variant={ "border-b-0 rounded-t-lg" }
                    htmlFor={ "primary" }
                />

                <FloatingLabel 
                    id={"secondary"}
                    type={ "text" }
                    text={ "Secondary" }
                    value={ secondary }
                    onChange={ (e) => setSecondary(e.target.value) }
                    variant={ "border-b-0 rounded-t-lg" }
                    htmlFor={ "secondary" }
                />

                <FloatingLabel 
                    id={"background"}
                    type={ "text" }
                    text={ "Background" }
                    value={ background }
                    onChange={ (e) => setBackground(e.target.value) }
                    variant={ "border-b-0 rounded-t-lg" }
                    htmlFor={ "background" }
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

                <FloatingLabel 
                    id={"description"}
                    type={ "text" }
                    text={ "Description" }
                    value={ description }
                    onChange={ (e) => setDescription(e.target.value) }
                    variant={ "border-b-0 rounded-t-lg" }
                    htmlFor={ "description" }
                />

                <FloatingLabel 
                    id={"siteName"}
                    type={ "text" }
                    text={ "SiteName" }
                    value={ siteName }
                    onChange={ (e) => setSiteName(e.target.value) }
                    variant={ "border-b-0 rounded-t-lg" }
                    htmlFor={ "siteName" }
                />

                <FloatingLabel 
                    id={"siteDescription"}
                    type={ "text" }
                    text={ "SiteDescription" }
                    value={ siteDescription }
                    onChange={ (e) => setSiteDescription(e.target.value) }
                    variant={ "border-b-0 rounded-t-lg" }
                    htmlFor={ "siteDescription" }
                />

                <FloatingLabel 
                    id={"keywords"}
                    type={ "text" }
                    text={ "Keywords" }
                    value={ Array.isArray(keywords) ? keywords.join(",") : keywords }
                    onChange={ (e) => setKeywords(e.target.value) }
                    variant={ "border-b-0 rounded-t-lg" }
                    htmlFor={ "keywords" }
                />

                <FloatingLabel 
                    id={"emailServer"}
                    type={ "email" }
                    text={ "EmailServer" }
                    value={ emailServer }
                    onChange={ (e) => setEmailServer(e.target.value) }
                    variant={ "border-b-0 rounded-t-lg" }
                    htmlFor={ "emailServer" }
                />

                <FloatingLabel 
                    id={"port"}
                    type={ "text" }
                    text={ "Port" }
                    value={ port }
                    onChange={ (e) => setPort(e.target.value) }
                    variant={ "border-b-0 rounded-t-lg" }
                    htmlFor={ "port" }
                />

                <FloatingLabel 
                    id={"username"}
                    type={ "email" }
                    text={ "Username" }
                    value={ username }
                    onChange={ (e) => setUsername(e.target.value) }
                    variant={ "border-b-0 rounded-t-lg" }
                    htmlFor={ "username" }
                />

                <FloatingLabel 
                    id={"password"}
                    type={ "password" }
                    text={ "Password" }
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value) }
                    variant={ "border-b-0 rounded-t-lg" }
                    htmlFor={ "password" }
                />

                <FloatingLabel 
                    id={"senderEmail"}
                    type={ "email" }
                    text={ "SenderEmail" }
                    value={ senderEmail }
                    onChange={ (e) => setSenderEmail(e.target.value) }
                    variant={ "border-b-0 rounded-t-lg" }
                    htmlFor={ "senderEmail" }
                />

                { errSettings && errSettings ? (
                    <div className="w-full flex items-center gap-1 text-red-500 text-base font-semibold">
                        <RiInformationLine className="text-xl" /> { `${errSettings.message}` }
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

export default SettingsForm;
