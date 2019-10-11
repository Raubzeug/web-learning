import React from 'react'
import './user-controls.less'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

export class UserControls extends React.Component {

    render = () => 
        { if (localStorage.logged_in === 'true') { 
            return <div>
                <Link className="register-login" to="/profile" title="Личный кабинет">
                    <img src={require('../../images/registration.png')} alt='profile' />
                    Личный кабинет
                </Link>
                <Link className="register-login" to="/logout" title="Выйти">
                    <img src={require('../../images/login.png')} alt='logout' />
                    Выйти
                </Link>
            </div>
        }
        if (localStorage.logged_in !== 'true') { return <div>
            <Link className="register-login" to="/registration" title="Регистрация">
                <img src={require('../../images/registration.png')} alt='registration' />
                Регистрация
            </Link>
            <Link className="register-login" to="/login" title="Войти">
                <img src={require('../../images/login.png')} alt='login' />
                Войти
            </Link>
        </div>

        }
        }
    }

const mapStateToProps = (state) => ({
    user_info: state.user_info,
})

export default connect(mapStateToProps)(UserControls)