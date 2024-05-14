import React, {useEffect, useState} from "react";
import {Button, FloatingLabel, Loading} from "../../../../../components/atoms"
import {useDispatch, useSelector} from "react-redux";
import {RiInformationLine} from "react-icons/ri";
import { updateUser } from "../../../usersSlice";

const EditForm = ({userAuth}) => {
    const dispatch = useDispatch()

    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { isUpdateUserLoading } = useSelector((state) => state.users);

    useEffect(() => {
        if(userAuth) {
            setId(userAuth._id)
            setName(userAuth.name)
            setUsername(userAuth.username)
            setEmail(userAuth.email)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAuth])
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        
        try{
            await dispatch(updateUser({ id, name, username, email, password, dispatch }))
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
                        id={"username"}
                        type={"text"}
                        text={"Username"}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        variant={"border-b-0 rounded-t-lg"}
                        htmlFor={"username"}
                        readOnly={true}
                    />

                    <FloatingLabel 
                        id={"email"}
                        type={"email"}
                        text={"Email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant={"border-b-0 rounded-t-lg"}
                        htmlFor={"email"}
                        readOnly={true}
                    />

                    <div className="my-4 flex gap-2">
                        <div>
                            <RiInformationLine className="text-3xl text-orange-500" />
                        </div>
                        <div className="text-sm text-orange-500">Kosongkan kolom password jika tidak ingin mengubahnya.</div>
                    </div>

                    <FloatingLabel 
                        id={"password"}
                        type={"password"}
                        text={"Password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant={"border-b-0 rounded-t-lg"}
                        htmlFor={"password"}
                    />

                    <Button
                        disabled={isUpdateUserLoading}
                        type={"submit"} 
                        variant={"bg-slate-700 shadow-lg text-white"}
                        text={!isUpdateUserLoading && "Update"}
                        icon={isUpdateUserLoading && <Loading text={true} />}
                    />
                </form>
            </div>
        </div>
    );
};

export default EditForm;