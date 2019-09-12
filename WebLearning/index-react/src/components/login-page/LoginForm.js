import React from 'react';
import './login-form.less'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {username: '', password: ''}
        this.handleChange = this.handleChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    validateForm() {
        return this.state.username.length > 3 && this.state.password.length > 3
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    submitForm = event => {
        event.preventDefault()
        this.props.submit({
            username: this.state.username,
            password: this.state.password
        })
    }

    render() {
        return (
        <form className='login-form' method="POST" name='login' 
        autoComplete="on" onSubmit={this.submitForm}>
            <label className='login-form__label'>
                Логин:
                <input className='login-form__input' type='text' name='username' 
                id='username' required autoFocus 
                value={this.state.username} onChange={this.handleChange}/>
            </label>
            <label className='login-form__label'>
                Пароль:
                <input className='login-form__input' type='password' 
                name='password' id='password' required
                value={this.state.password} onChange={this.handleChange} />
            </label>

            <div className="login-form__buttons">
                <input className='login-form__submit' type="submit" value="Войти"
                disabled={!this.validateForm()} />
            </div>
            {(this.props.success && <div className='message--green'>{this.props.success}</div>)}
            {this.props.errors && 
                <div className='message--red'>
                    {this.props.errors.map(item => <span key={item}>{item}</span>)}
                </div>}
        </form>)
    }
}

export default LoginForm