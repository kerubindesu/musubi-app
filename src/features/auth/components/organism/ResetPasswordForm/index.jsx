import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Loading } from '../../../../../components/atoms'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../../../authSlice'

const ResetPaswordForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { token } = useParams();

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const { sendResetPasswordTokenStatus } = useSelector((state) => state.auth);

    useEffect(() => {
        if (password !== confirmPassword) {
            setErrorMessage({ message: "Kata sandi dan konfirmasi kata sandi tidak cocok" })
        } else {
            setErrorMessage("")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmPassword])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            await dispatch(resetPassword({ token, password, dispatch, navigate }))
        } catch (error) {
            if(error.response) {
                console.log(error)
            }
        }
    }

  return (
    <>
        <div className="flex-[2] p-8 h-full w-full max-w-sm bg-white flex flex-col justify-center items-center gap-4 rounded-t-xl md:rounded-r-none md:rounded-l-xl shadow">
            <form onSubmit={handleSubmit} className='w-full flex flex-col justify-center items-center gap-4'>
                <div className="mb-4 w-full text-center">
                    <h1 className="text-2xl font-semibold text-slate-800">Reset Password</h1>
                </div>

                <FloatingLabel 
                    id={"password"}
                    type={"password"}
                    text={"Password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value) }
                    variant={"border-b-0 rounded-t-lg"}
                    htmlFor={"password"}
                />

                <FloatingLabel 
                    id={"confirmPassword"}
                    type={"password"}
                    text={"Confirm Password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value) }
                    variant={"border-b-0 rounded-t-lg"}
                    htmlFor={"confirmPassword"}
                />

                {errorMessage !== "" ? (
                    <div className="p-2 w-full bg-red-100 border-2 border-red-500 rounded">
                        {errorMessage?.message}
                    </div>
                ) : (
                    <></>
                )}
                
                <Button 
                    disabled={sendResetPasswordTokenStatus === "loading"}
                    type={"submit"} 
                    variant={"mb-4 bg-slate-800 shadow-lg text-white"}
                    text={sendResetPasswordTokenStatus !== "loading" && "Save"}
                    icon={sendResetPasswordTokenStatus === "loading" && <Loading />}
                />
            </form>
        </div>
    </>
  )
}

export default ResetPaswordForm