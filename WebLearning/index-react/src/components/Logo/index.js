import React from 'react';
import Logopic from '../../images/logo.png'
import { Link } from 'react-router-dom'
import './logo.less'

const Logo = () => (
    <Link
    className="logo"
    to='/'
    title="На главную"
    >
        <img className="logo__pic" src={Logopic} alt='logo' />
    </Link>
)

export default Logo