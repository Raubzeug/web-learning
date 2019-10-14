import React from 'react';
import { Redirect } from 'react-router'
import LoginForm from './LoginForm'
import fetchData, { handleErrors } from '../../services/fetchData'
import './login-content.less'
import {Link} from 'react-router-dom'


class LoginContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {success: '', error: '', errors: [], redirect: false}
    }
    
    submitForm = (eventData) => {
        this.setState({success: '', error: '', errors: []})
        fetchData('/api/auth/login/', eventData, 'POST')
            .then(handleErrors)
            .then(data => {
                localStorage.setItem('logged_in', false);
                if ('token' in data) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('logged_in', true);
                    this.setState({
                        success: 'You are sucessfully logged in!',
                        redirect: true
                    })
                }
            })
            .catch(err => {
                console.error(err)
                return err.response.json()
            })
            .then(data => {
                if (data) {
                    for (let elem in data) {
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

export default LoginContent