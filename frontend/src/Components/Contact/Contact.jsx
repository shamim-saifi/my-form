import React, { useContext, useState } from 'react'
import './Contact.css'
import axios from 'axios'
import { Context, server } from '../../index'
import toast from 'react-hot-toast'

const Contact = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [comment, setComment] = useState()

  const { setLoading } = useContext(Context)

  const contactHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(`${server}/user/contact`,
        { name, email, comment },
        {
          headers: {
            'Content-Type': 'application/json'
          },
        withCredentials:true
        })
      toast.success(data.message)
      setLoading(false)

    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)

    }


  }
  return (
    <div className='contact' >
      <h2>Contact Us</h2>
      <form onSubmit={contactHandler}>
        <input required type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
        <input required type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
        <input required type="text" placeholder='comment' onChange={(e) => setComment(e.target.value)} />
        <button type='submit'>Comment</button>
      </form>
    </div>
  )
}

export default Contact