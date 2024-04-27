import React, { useState } from 'react'
import { Button, FloatingLabel, Loading } from '../../../../../components/atoms'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { sendResetPasswordToken } from '../../../authSlice'

const SendResetPasswordTokenForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")

    const { sendResetPasswordTokenStatus } = useSelector((state) => state.auth);

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            await dispatch(sendResetPasswordToken({ email, dispatch, navigate }))
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
                    <h1 className="text-2xl font-semibold text-slate-800">Forgot password</h1>
                </div>

                <FloatingLabel 
                    id={"email"}
                    type={"email"}
                    text={"Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value) }
                    variant={"border-b-0 rounded-t-lg"}
                    htmlFor={"email"}
                />
                
                <Button 
                    disabled={sendResetPasswordTokenStatus === "loading"}
                    type={"submit"} 
                    variant={"mb-4 bg-slate-800 shadow-lg text-white"}
                    text={sendResetPasswordTokenStatus !== "loading" && "Reset Password"}
                    icon={sendResetPasswordTokenStatus === "loading" && <Loading text={true} />}
                />
            </form>

            <div className="pt-6 w-full flex justify-start items-center gap-1 border-t">
                <p className="taxt-base">Go back to</p>
                <Link className="text-blue-500" to="/auth/login">Login</Link>
            </div>
        </div>
    </>
  )
}

export default SendResetPasswordTokenForm