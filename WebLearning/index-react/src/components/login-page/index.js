import React from 'react';
import { Redirect } from 'react-router'
import LoginForm from './LoginForm'
import getCookie from '../../js/getCookie'
import './login-content.less'

import { connect } from "react-redux";
import { setLoggedIn } from '../../js/actions'
import {Link} from 'react-router-dom'


class LoginContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {success: '', error: '', errors: [], redirect: false}
        this.submitForm = this.submitForm.bind(this)
    }
    
    submitForm = (eventData) => {
        this.setState({success: '', error: '', errors: []})
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
            }
        fetch('/api/auth/login/', {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify(eventData),
            })
            .then(response => {
                return response.json()})
                .then(data => {
                    if ('token' in data) {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('logged_in', true);
                        this.props.setLoggedIn()
                        this.setState({
                            success: 'You are sucessfully logged in!',
                            redirect: true
                        })
                    }
                    else {
                        localStorage.setItem('logged_in', false);
                        for (var elem in data) {
                            this.setState({error: data[elem]})
                            this.setState(state => {
                                const errors = state.errors.concat(state.error)
                                return {
                                    errors,
                                    error: ''
                                }
                            })
                        }
                        }
                })
                .catch(err => console.error(err))        
    }

    render = () => {
        const redirect = this.state.redirect
        if (redirect) {
            return (
                <Redirect to={{
                    pathname: "/profile",
                    state: { username: this.state.success }
             }} />
            )
        }
        else {
            return (
                <section className="content">
                    <div className="content__header_gradient">
                            <span>Войти в личный кабинет</span>
                    </div>
                    <div className='centered-div-padding-10'>
                        Не зарегистрированы?<br/>
                        <Link className='base-link' to='./registration'>Зарегистрироваться</Link>
                    </div>
                    <LoginForm submit={this.submitForm} success={this.state.success}
                             errors={this.state.errors} />
                    <div className='centered-div-padding-10'>
                        Забыли пароль?<br/>
                        <Link className='base-link' to='/'>Восстановление пароля</Link>
                    </div>
                </section>
    )}}
}

export default connect(null, { setLoggedIn } )(LoginContent)