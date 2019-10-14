import React from 'react';
import RegistrationForm from './RegistrationForm'

import fetchData, {handleErrors} from '../../services/fetchData'
import './registration-content.less'
import {Link} from 'react-router-dom'


class RegistrationContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {success: '', error: '', errors: []}
    }
    
    submitForm = (eventData) => {
        this.setState({success: '', error: '', errors: []})

        fetchData(
            '/api/auth/registration/',
            eventData,
            'POST'
            )
        .then(handleErrors)
        .then(data => {
            this.setState({
                success: 'You are sucessfully register! Check your mail for verification link.'
            })

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

    render() {
        return (
        <section className="content">
            <div className="content__header_gradient">
                    <span>Регистрация</span>
            </div>
            <div className='centered-div-padding-10'>
                Уже зарегистрированы?<br/>
                <Link className='base-link' to='./login'>Войти</Link>
            </div>
            <RegistrationForm submit={this.submitForm} success={this.state.success} errors={this.state.errors} />
            
        </section>
    )}
}

export default RegistrationContent