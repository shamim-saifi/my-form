import React, { useContext, useState } from 'react'
import { Context, server } from '../../index'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom'

const UpdateForm = () => {
    const { singleFormId, singleFormData, loading, setLoading } = useContext(Context)

    const [uname, setuName] = useState(singleFormData.name)
    const [uemail, setuEmail] = useState(singleFormData.email)
    const [ugender, setuGender] = useState(singleFormData.gender)
    const [uphone, setuPhone] = useState(singleFormData.phone)
    const [ustate, setuState] = useState(singleFormData.state)
    const [ucity, setuCity] = useState(singleFormData.city)


    const navigate = useNavigate()
    const updateFormHandler = async (singleFormId) => {
        setLoading(true)
        try {

            const { data } = await axios.put(`${server}/form/updatemyform/${singleFormId}`,
                {
                    uname, uemail, ugender, uphone, ustate, ucity
                },
                { withCredentials: true })

            setLoading(false)
            navigate('/userprofile')
            toast.success(data.message)

        } catch (error) {
            toast.error(error.response.data.message)
            setLoading(false)
        }
    }

    return (


        <div style={{ backgroundColor: '#3c0a5044' }}>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
                <input style={{ border: '2px solid #3c0a50e0', color: 'black' }} type="text" placeholder='name' value={uname} onChange={((e) => setuName(e.target.value))} />
                <input style={{ border: '2px solid #3c0a50e0', color: 'black' }} type="text" placeholder='email' value={uemail} onChange={((e) => setuEmail(e.target.value))} />
                <input style={{ border: '2px solid #3c0a50e0', color: 'black' }} type="text" placeholder='gender' value={ugender} onChange={((e) => setuGender(e.target.value))} />
                <input style={{ border: '2px solid #3c0a50e0', color: 'black' }} type="number" placeholder='phone' value={uphone} onChange={((e) => setuPhone(e.target.value))} />
                <input style={{ border: '2px solid #3c0a50e0', color: 'black' }} type="text" placeholder='state' value={ustate} onChange={((e) => setuState(e.target.value))} />
                <input style={{ border: '2px solid #3c0a50e0', color: 'black' }} type="text" placeholder='city' value={ucity} onChange={((e) => setuCity(e.target.value))} />
                <button
                    style={{
                        border: '2px solid #3c0a50e0', color: 'white', padding: '1vmax', borderRadius: '8px',
                        fontSize: '1.5vmax', backgroundColor: '#3c0a5044', cursor: 'pointer',
                       
                    }}
                    onClick={() => updateFormHandler(singleFormId)} >Update</button>
            </div>
        </div>



    )
}

export default UpdateForm