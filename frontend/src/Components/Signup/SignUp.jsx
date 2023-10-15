import React, { useContext, useState } from 'react'
import './SignUp.css'
import { Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios'
import { server, Context } from '../../index'


const SignUp = () => {

    const { isAuthUser, setisAuthUser,setLoading } = useContext(Context)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHnader = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {

            const { data } = await axios.post(`${server}/user/newuser`,
                { name, email, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    withCredentials: true
                }
            )
            toast.success(data.message)
            setisAuthUser(true)
            setLoading(false)

        } catch (error) {
            toast.error(error.response.data.message);
            setisAuthUser(false)
            setLoading(false)

        }

    }
    if (isAuthUser) {
        return <Navigate to={'/Account'} />
    }
    return (
        <div className='SignUp'>
            <h2>Access To SMART FORM </h2>
            <h3>Please Login or SingUp</h3>
            <form onSubmit={submitHnader}>
                <input value={name} required onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Your Name' />
                <input value={email} required onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter Your Email' />
                <input value={password} required onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter Your Password' />
                <button type='submit'>SignUp</button>
            </form>
            <div className='loginText'>
                <p style={{ marginRight: "1vmax", fontFamily: "Roboto" }}>I have Account</p>
                <Link to='/login'>Login</Link>
            </div>

        </div>
    )
}

export default SignUp