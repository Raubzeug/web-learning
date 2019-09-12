import React from 'react';
import RegistrationForm from './RegistrationForm'
import {getCookie} from '../../js/getCookie'
import './registration-content.less'


class RegistrationContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {success: '', error: '', errors: []}
        this.submitForm = this.submitForm.bind(this)
    }
    
    submitForm(eventData) {
        this.setState({success: '', error: '', errors: []})
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
            }
        fetch('/api/auth/registration/', {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify(eventData),
            })
            .then(response => {
                return response.json()})
                .then(data => {
                    if ('username' in data) {
                        this.setState({
                            success: 'You are sucessfully register! Check your mail for verification link.'
                        })
                    }
                    else {
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

    render() {
        return (
        <section className="content">
            <div className="content__header_gradient">
                    <span>Регистрация</span>
            </div>
            <div className='centered-div-padding-10'>
                Уже зарегистрированы?<br/>
                <a className='base-link' href='./login'>Войти</a>
            </div>
            <RegistrationForm submit={this.submitForm} success={this.state.success} errors={this.state.errors} />
            
        </section>
    )}
}

export default RegistrationContent