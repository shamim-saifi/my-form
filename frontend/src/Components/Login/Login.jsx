import React, { useContext, useState } from 'react'
import './Login.css'
import { Link, Navigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios'
import { server, Context } from '../../index'

const Login = () => {

    const { isAuthUser, setisAuthUser,setLoading } = useContext(Context)

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()


    const submitHnader = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {

            const { data } = await axios.post(`${server}/user/login`,
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    withCredentials: true
                }
            )
            setisAuthUser(true)
            setLoading(false)
            toast.success(data.message)

        } catch (error) {
            setisAuthUser(false)
            setLoading(false)
            toast.error(error.response.data.message);

        }
    }

    if (isAuthUser) {
        return <Navigate to={'/Account'} /> 
    }
    return (
        <div className='Login'>
            <h1>Login for SMART FORM</h1>
            <form onSubmit={submitHnader}>
                <input required onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter Your Email' />
                <input required onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter Your Password' />
                <button type='submit'>Login</button>
            </form>
            <div className='loginText'>
                <p style={{ marginRight: "2vmax", fontFamily: "Roboto" }}>I don't have Account</p>
                <Link to='/signup'>SignUp</Link>
            </div>

        </div>
    )
}

export default Login