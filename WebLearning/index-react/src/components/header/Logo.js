import React from 'react';

const Logo = () => (
    <a
    className="header__logo"
    href="/index.html"
    title="На главную"
    >
        <img src={require('../../images/logo.png')} alt='logo' />
    </a>
)

export default Logo