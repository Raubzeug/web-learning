import React from 'react';
import {Link} from 'react-router-dom'

const RegisterLogin = () => (
    <div className='register-login'>
        <Link className="register-login" to="/registration" title="Регистрация">
                <img src={require('../../images/registration.png')} alt='registration' />
                Регистрация
        </Link>
        <Link className="register-login" to="/login" title="Войти">
                <img src={require('../../images/login.png')} alt='login' />Войти
        </Link>
    </div>
)

export default RegisterLogin