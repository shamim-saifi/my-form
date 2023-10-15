import React from 'react'
import { ReactNavbar } from 'overlay-navbar'
import {CgProfile} from 'react-icons/cg'
import logo from '../../Img/logo.png'

const Header = () => {
    return (
        <ReactNavbar
            navColor1='white'
            navColor2='black'

            burgerColorHover='tomato'

            nav2justifyContent="space-around"
            nav3justifyContent="space-around"

            logo={logo}
            logoWidth='250px'
            logoHoverColor='tomato'

            link1Color='white'
            link1Size='1.5rem'
            link1Padding='3rem'
            link1ColorHover='tomato'

            link1Text='HOME'
            link2Text='ABOUT'
            link3Text='SHAMIM ADMIN'
            link4Text='CONTACT'

            link1Url='/'
            link2Url='/about'
            link3Url='https://shamim-saifi.vercel.app'
            link4Url='/contact'

            profileIcon={true}
            ProfileIconElement={CgProfile}
            profileIconColor='white'
            profileIconColorHover='tomato'
        />


    )
}

export default Header