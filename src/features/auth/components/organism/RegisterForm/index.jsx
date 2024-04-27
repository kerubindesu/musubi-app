import React, {useState} from 'react'
import {Button, FloatingLabel, Loading} from '../../../../../components/atoms'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {registerUser, selectLoading} from '../../../authSlice'
import {useDispatch, useSelector} from 'react-redux'

const RegisterForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const isLoading = useSelector(selectLoading)

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            await dispatch(registerUser({name, username, email, password, dispatch, navigate}))
       } catch (error) {
            if(error.response) {
                console.log(error)
           }
       }
   }

  return (
    <>
        <div className="flex-[2] p-6 sm:p-8 h-full w-full max-w-sm bg-white flex flex-col justify-center items-center gap-4 rounded-t-xl md:rounded-r-none md:rounded-l-xl shadow">
            <form onSubmit={handleSubmit} className='w-full flex flex-col justify-center items-center gap-4'>
                <div className="mb-4 w-full text-center">
                    <h1 className="text-2xl font-semibold text-slate-800">Register</h1>
                </div>
                
                <FloatingLabel 
                    id={"name"}
                    type={"text"}
                    text={"Nama Lengkap"}
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
                />
                <FloatingLabel 
                    id={"email"}
                    type={"text"}
                    text={"Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant={"border-b-0 rounded-t-lg"}
                    htmlFor={"email"}
                />
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
                    disabled={isLoading}
                    type={"submit"} 
                    variant={"mb-4 bg-zinc-800 shadow-lg text-white"}
                    text={!isLoading && "Register"}
                    icon={isLoading && <Loading text={true} />}
                />
            </form>

            <div className="pt-6 w-full flex justify-start items-center gap-1 border-t">
                <p className="taxt-base">Have an account?</p>
                <Link className="text-blue-500" to="/auth/login">Login</Link>
            </div>
        </div>
    </>
  )
}

export default RegisterForm