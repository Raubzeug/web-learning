import React from 'react';
import Logopic from '../../images/logo.png'
import { Link } from 'react-router-dom'

const Logo = () => (
    <Link
    className="header__logo"
    to='/'
    title="На главную"
    >
        <img src={Logopic} alt='logo' />
    </Link>
)

export default Logo