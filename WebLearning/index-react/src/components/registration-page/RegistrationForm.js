import React from 'react';
import Message from '../Message'

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {username: '', email: '', password: '', confirm_password: '',
                        passwords_mathes: false}
        this.handleChange = this.handleChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    validateForm = () => (
        this.state.username.length > 3 && this.state.password.length > 5 &&
        this.state.email.includes('@') && this.state.password === this.state.confirm_password
    )

    validatePassword = () => {
    if (this.state.password === this.state.confirm_password) {
        this.setState({passwords_mathes: true})
    }
    }

    // handleChange = event => {
    //     this.setState({
    //         [event.target.id]: event.target.value
    //     })
    // }

    handleChange = ({target: {name, value}}) => this.setState({ [name]: value })

    submitForm = event => {
        event.preventDefault()
        this.props.submit({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirm_password: this.state.confirm_password
        })
    }

    render =() => (
        <form className='reg-form' method="POST" name='login' 
        autoComplete="on" onSubmit={this.submitForm}>
            <label className='reg-form__label'>
                Логин:
                <input className='reg-form__input' type='text' name='username' 
                required autoFocus 
                value={this.state.username} onChange={this.handleChange}/>
            </label>
            <label className='reg-form__label'>
                Емейл:
                <input className='reg-form__input' type='text' name='email' 
                required 
                value={this.state.email} onChange={this.handleChange}/>
            </label>
            <label className='reg-form__label'>
                Пароль (мин. 6 символов):
                <input className='reg-form__input' type='password' 
                name='password' required
                value={this.state.password} onChange={this.handleChange} />
            </label>
            <label className='reg-form__label'>
                Подтвердите пароль:
                <input className='reg-form__input' type='password' 
                name='confirm_password' required
                value={this.state.confirm_password} onChange={this.handleChange}
                    onKeyUp={this.validatePassword} />
                <p>{this.state.passwords_mathes === true ? 'OK': 'Passwords doesn\'t match'}</p> 
            </label>

            <div className="reg-form__buttons">
                <input className='reg-form__submit' type="submit" value="Зарегистрироваться"
                disabled={!this.validateForm()} />
            </div>
            <Message success={this.props.success} errors={this.props.errors}/>
        </form>)
}

export default RegistrationForm