import React, { useContext, useEffect, useState } from 'react'
import './UserProfile.css'
import axios from 'axios'
import { server, Context } from '../../index'
import toast from 'react-hot-toast'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'


const UserProfile = () => {

    const navigate = useNavigate();
    const { user, formData, setFormData, setSingleFormId, setSingleFormData, setLoading } = useContext(Context)
    const [refForm, setRefForm] = useState(false)

    const delteFormHandler = async (_id) => {
        setLoading(true)
        try {
            const { data } = await axios.delete(`${server}/form/deletemyform/${_id}`, { withCredentials: true })
            toast.success(data.message)
            setRefForm(true)
            setLoading(false)

        } catch (error) {
            toast.error(error.response.data.message)
            setRefForm(false)
            setLoading(false)

        }

    }

    const editFormHandler = async (_id) => {
        setSingleFormId(_id)
        setLoading(true)
        try {
            const { data } = await axios.get(`${server}/form/getsingleform/${_id}`, { withCredentials: true })
            setSingleFormData(data.form)
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setLoading(false)

        }



        navigate('/updateform')

    }

    useEffect(() => {
        axios.get(`${server}/form/getmyform`, { withCredentials: true })
            .then((res) => {
                setFormData(res.data.user)
            }).catch((error) => {
                setFormData([])
                toast.error(error.response.data.message)
            })
    }, [refForm])

    return (
        <>
            <div className='TableContainer'>
                <h1>{`Wellcome ${user.name}`}</h1>
                <div className='userTable'>
                    <table>
                        <thead>
                            <tr>
                                <th>s.no</th>
                                <th>POSTER</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>GENDER</th>
                                <th>PHONE</th>
                                <th>STATE</th>
                                <th>CITY</th>
                                <th>ACTION</th>

                            </tr>
                        </thead>
                        <tbody>

                            {
                                formData.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i}</td>
                                        <td style={{}}>
                                            <img
                                                src={item.avatar.url} alt="poster"
                                                style={{ width: '50px', }}
                                            />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.state}</td>
                                        <td>{item.city}</td>
                                        <td>
                                            <button onClick={() => editFormHandler(item._id)}>Edit</button>
                                            <button onClick={() => delteFormHandler(item._id)}>delete</button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
                <button id='back' onClick={() => navigate('/Account')}><BsFillArrowLeftCircleFill /></button>
            </div>
        </>
    )
}

export default UserProfile