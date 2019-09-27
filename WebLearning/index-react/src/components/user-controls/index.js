import React from 'react'
import './user-controls.less'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

class UserControls extends React.Component {
    render = () => 
        (
            <div className='register-login'>
                {!this.props.logged_in && <Link className="register-login" to="/registration" title="Регистрация">
                        <img src={require('../../images/registration.png')} alt='registration' />
                        Регистрация
                </Link>}
                {this.props.logged_in && <Link className="register-login" to="/profile" title="Личный кабинет">
                        <img src={require('../../images/registration.png')} alt='profile' />
                        Личный кабинет
                </Link>}

                {!this.props.logged_in && <Link className="register-login" to="/login" title="Войти">
                        <img src={require('../../images/login.png')} alt='login' />
                        Войти
                </Link>}
                {this.props.logged_in && <Link className="register-login" to="/logout" title="Выйти">
                        <img src={require('../../images/login.png')} alt='logout' />
                        Выйти
                </Link>}
            </div>
        )
    }

const mapStateToProps = (state) => ({
    logged_in: state.logged_in,
})

export default connect(mapStateToProps)(UserControls)