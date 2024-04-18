import React, { useState } from 'react'
import { Button, FloatingLabel, Loading } from '../../../../../components/atoms'
import { useNavigate } from 'react-router-dom'
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
        <div className="flex-[2] py-10 px-4 md:px-10 h-full w-full md:max-w-[24rem] bg-white flex flex-col justify-center items-center gap-4 rounded-t-xl md:rounded-r-none md:rounded-l-xl">
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
                    variant={"bg-gradient-to-r from-sky-800 to-sky-700 shadow-lg text-white"}
                    text={!isLoading && "Login"}
                    icon={isLoading && <Loading />}
                />
            </form>

            {/* <div className="w-full flex justify-start items-center gap-1 font-semibold">
                <p className="taxt-base">Don't have an account?</p>
                <Link className="text-blue-500" to="/auth/register">Register</Link>
            </div> */}
        </div>
    </>
  )
}

export default LoginForm