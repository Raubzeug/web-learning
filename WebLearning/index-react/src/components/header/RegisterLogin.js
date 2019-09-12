import React from 'react';

const RegisterLogin = () => (
    <div className='register-login'>
        <a className="register-login" href="/registration" title="Регистрация">
                <img src={require('../../images/registration.png')} alt='registration' />
                Регистрация
        </a>
        <a className="register-login" href="/login" title="Войти">
                <img src={require('../../images/login.png')} alt='login' />Войти
        </a>
    </div>
)

export default RegisterLogin