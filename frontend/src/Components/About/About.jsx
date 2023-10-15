import React from 'react'
import './About.css'
import about from '../../Img/about.jpg'
import { CgProfile } from 'react-icons/cg'

const About = () => {
    return (
        <>
            <div className='about'>
                <img src={about} alt="about" />
                <div className='aboutText'>
                    <h1>About Us</h1>

                    <p>We provide different different Form Template for different Registration.
                        it can be Private and Government Sector.
                        And Form Template like College Admission, Hiring, Event, Personal, Contact, Promotions and etc.
                    </p>
                    <p>
                        we create form with DataBase and give you Form-Link through this Link you can access your Form and
                        send it to any one for Registration.
                        After all Registration done we will give you your Form data in Excel sheet
                    </p>

                    <button><a href="https://shamim-saifi.vercel.app" target='_blank'><CgProfile /> Contact To Admin</a></button>
                </div>

            </div>
        </>
    )
}

export default About