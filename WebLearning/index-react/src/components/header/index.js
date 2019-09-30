import React from 'react';
import Logo from '../Logo'
import Navigation from '../Navigation'
import Search from '../Search'
import UserControls from '../user-controls'
import './header.less'

const Header = () => (
    <nav className='header'>
        <Logo />
        <Navigation />
        <div className='header__right-wrapper'>
            <Search />
            <UserControls />
        </div>
    </nav>
)

export default Header;