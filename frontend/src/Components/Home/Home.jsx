import React from 'react'
import bg from '../../Img/bg.png'
import center from '../../Img/center.jpg'
import {BsFillEmojiSmileFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'

import './Home.css'
import Contact from '../Contact/Contact'
import About from '../About/About'

const Home = () => {
    return (
        <>
            <div className='home'>
                <img src={bg} alt="homeImg" />
                <div className='homeText'>
                    <div className='homeHeading'>
                        <p>S</p>
                        <p>M</p>
                        <p>A</p>
                        <p>R</p>
                        <p>T</p>
                        <p style={{ marginLeft: '2vmax' }}>F</p>
                        <p>O</p>
                        <p>R</p>
                        <p>M</p>
                    </div>
                    <Link to="/signup"><BsFillEmojiSmileFill /></Link>
                </div>
            </div>

            <div className='service'>
                <h1>SERVICE</h1>
                <div>
                    <img src={center} alt="serviceIMg" />
                    <div className='serviceText'>
                        <p>Check Out Form </p>
                        <Link to='/signup'>Try Me</Link>
                    </div>
                </div>
            </div>
            <Contact />
            <About />
        </>
    )
}

export default Home