import React from 'react';
import Logopic from '../../images/logo.png'

const Logo = () => (
    <a
    className="header__logo"
    href="/index.html"
    title="На главную"
    >
        <img src={Logopic} alt='logo' />
    </a>
)

export default Logo