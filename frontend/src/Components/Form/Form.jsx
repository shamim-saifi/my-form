import React, { useContext, useEffect, useState } from 'react'
import './Form.css'
import axios from 'axios'
import { server, Context } from '../../index'
import { toast } from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import smart from '../../Img/smart.jpg'

var citys = {
    'Uttar Pradesh': [
        'Kanpur',
        'Lucknow',
        'Ghaziabad',
        'Agra',
        'Meerut',
        'Varanasi',
    ],
    'Madhya Pradesh': [
        'Agar Malwa',
        'Alirajpur',
        'Anuppur',
        'Ashoknagar',
        'Balaghat',
        'Barwani',
        'Betul',
        'Bhind',
        'Bhopal',
        'Burhanpur',
        'Chhatarpur',
        'Chhindwara',

    ],
    'Rajasthan': ['Jodhpur',
        'Kota',
        'Bikaner',
        'Bhiwadi',
        'Udaipur',
        'Ajmer',
        'Bhilwara',
        'Alwar',
        'Sikar',
    ],
    'Gujarat': ['Surat',
        'Vadodara',
        'Rajkot',
        'Bhavnagar',
        'Jamnagar',
        'Gandhinagar',
        'Junagadh',
        'Gandhidham',
        'Anand',
    ],

}
var states = ['Select State', 'Uttar Pradesh', 'Madhya Pradesh', 'Rajasthan', 'Gujarat']

const gen = ['MALE', 'FEMALE', 'OTHER']

const Form = () => {

    const { setisAuthUser, setUser,user, setLoading } = useContext(Context)

    const naviagte = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [birth, setBirth] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [avatar, setAvatar] = useState('')
    const [pro, setPro] = useState(false)

    const LogoutHandler = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${server}/user/logout`, { withCredentials: true })

            setisAuthUser(false)
            setLoading(false)

            naviagte('/')
            toast.success(data.message)
        } catch (error) {
            toast.error(error.response.data.message);
            setisAuthUser(true)
            setLoading(false)

        }
    }

    const formHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {

            const { data } = await axios.post(`${server}/form/newform`,
                { name, email, gender, phone, state, city, avatar, birth },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    withCredentials: true
                }
            )

            setPro(true)
            setName('')
            setEmail('')
            setGender('')
            setPhone('')
            setState('')
            setCity('')
            setAvatar('')
            setBirth('')
            naviagte('/userprofile')
            toast.success(data.message)
            setLoading(false)

        } catch (error) {
            toast.error(error.response.data.message);
            setPro(false)
            setLoading(false)

        }

    }

    const FomrAvatarHandler = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result)
            }
        }
    }

    useEffect(() => {
        axios.get(`${server}/user/me`, { withCredentials: true })
            .then((res) => {
                setUser(res.data.user)
            })
            .catch((error) => {
                toast.error(error.response.data.message)
                setUser({})
            })
    }, [setUser])

    if (pro) {
        return <Navigate to={'/userprofile'} />
    }
    return (
        <div className='smartForm'>
            <img src={smart} alt="back" />
            {/* <h1>WELLCOME IN SMART FORM</h1> */}
            <form onSubmit={formHandler} >
                <input id='whitColor' required value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Your Name' />
                <input id='whitColor' required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter Your Email' />

                <div className='gender'>
                    {
                        gen.map((item) => (
                            <div key={item} className='containeGen'>
                                <input required value={item} onChange={(e) => setGender(e.target.value)} name='gender' type="radio" />
                                <label htmlFor="gender">{item}</label>

                            </div>
                        ))
                    }
                </div>

                <input required value={phone} onChange={(e) => setPhone(e.target.value)} type="number" placeholder='Phone number' />
                <input required value={birth} onChange={(e) => setBirth(e.target.value)} type="date" style={{ color: "white" }} />
                <select required value={state} onChange={(e) => setState(e.target.value)}>
                    {
                        states.map((item, i) => (
                            <option key={i}>{item}</option>
                        ))
                    }
                </select>
                <select required value={city} onChange={(e) => setCity(e.target.value)}>
                    {
                        citys[state]?.map((item, i) => (
                            <option key={i}>{item}</option>
                        ))
                    }
                </select>
                <input required onChange={FomrAvatarHandler} type="file" placeholder='Enter Your file' />
                <button type='submit'>Registration</button>
            </form>
            <button onClick={LogoutHandler}>Logout</button>

            <button onClick={() => naviagte('/userprofile')} id='userProfile' >
                <CgProfile />
            </button>

        </div>
    )
}

export default Form