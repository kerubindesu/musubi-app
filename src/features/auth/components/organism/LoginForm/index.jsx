import React, { useState } from 'react'
import { Button, FloatingLabel, Loading } from '../../../../../components/atoms'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, selectLoading } from '../../../authSlice'

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const isLoading = useSelector(selectLoading)

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            await dispatch(loginUser({ username, password, dispatch, navigate }))
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
                    <h1 className="text-2xl font-semibold text-slate-800">Login</h1>
                </div>

                <FloatingLabel 
                    id={"username"}
                    type={"text"}
                    text={"Username"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    variant={"border-b-0 rounded-t-lg"}
                    htmlFor={"username"}
                />
                <FloatingLabel 
                    id={"password"}
                    type={"password"}
                    text={"Password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value) }
                    variant={"border-b-0 rounded-t-lg"}
                    htmlFor={"password"}
                />
                
                <Button 
                    disabled={isLoading}
                    type={"submit"} 
                    variant={"bg-slate-800 shadow-lg text-white"}
                    text={!isLoading && "Login"}
                    icon={isLoading && <Loading text={true} />}
                />
            </form>

            <div className="my-4 w-full flex justify-center items-center font-semibold">
                <Link className="text-blue-500 text-xs" to="/auth/send-reset-password-token">Forgot Password?</Link>
            </div>

            <div className="pt-6 w-full flex justify-start items-center gap-1 border-t">
                <p className="taxt-base">Don't have an account?</p>
                <Link className="text-blue-500" to="/auth/register">Register</Link>
            </div>
        </div>
    </>
  )
}

export default LoginForm