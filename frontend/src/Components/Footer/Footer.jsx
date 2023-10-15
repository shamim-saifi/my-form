import React from 'react'
import './Footer.css'
import logo from '../../Img/logo.png'
import { BsYoutube, BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs'

const Footer = () => {
  return (
    <div className='footer'>
      <div>
        <h1>SMART FORM</h1>
        <p>This is simple Form web app...</p>
      </div>
      <div className='footerLogo'>
        <img src={logo} alt="logo" />
        <h1>SMART FORM</h1>

      </div>
      <div>
        <p>Social Media</p>
        <a href=""><BsYoutube /></a>
        <a href=""><BsFacebook /></a>
        <a href=""><BsInstagram /></a>
        <a href=""><BsTwitter /></a>

      </div>
    </div>
  )
}

export default Footer