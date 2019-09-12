import React from 'react';
import Logo from './Logo.js'
import Navigation from './Navigation.js'
import Search from './Search.js'
import RegisterLogin from './RegisterLogin'
import './header.less'

const Header = () => (
    <nav className='header'>
        <Logo />
        <Navigation />
        <div className='header__right-wrapper'>
            <Search />
            <RegisterLogin />
        </div>
    </nav>
)

export default Header;