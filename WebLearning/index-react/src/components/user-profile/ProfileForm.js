import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './user-profile.less'
import {getCookie} from '../../js/getCookie'
import Message from '../Message'

class ProfileForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            prev_email: '',
            email: '',
            first_name: '', 
            last_name: '',
            logged: false,
            upd_user_data: false,
            startDate: new Date(1986,8,19),
        }
        this.getProfile = this.getProfile.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.handleChangeTime = this.handleChangeTime.bind(this)
    }

    validateForm = () => (
        this.state.username.length > 3 && this.state.email.includes('@')
    )

    componentDidMount = () => {
        this.getProfile()
    }

    componentDidUpdate = () => {
        if (this.state.upd_user_data) {
            this.getProfile()
            this.setState({upd_user_data: false})
        }
    }

    handleChange = ({target: {name, value}}) => this.setState({ [name]: value })

    handleChangeTime =(date) => (
        this.setState({
        startDate: date
        })
      )

    getProfile = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
            }
        fetch('/api/auth/user/', {
            method: 'GET',
            headers: headers,
            credentials: 'include',
            })
            .then(response => {
                if (response.status === 401) {
                    this.setState({
                        logged: false
                    })
                }
                else {
                    this.setState({
                        logged: true
                    })
                }
                return response.json()
                })
            .then(data => {
                if (this.state.logged === true) {
                    this.setState({
                        username: data.username,
                        email: data.email,
                        prev_email: data.email,
                        first_name: data.first_name, 
                        last_name: data.last_name
                    })
                    }
                })
            .catch(err => console.error(err))
    }

    submitForm = event => {
        event.preventDefault()
        
        const d = new Date();
        d.setDate(d.getDate() - 365*16);
        if (this.state.startDate > d) {
            alert('You must be older then 16 years old!')
        }

        if (this.state.prev_email !== this.state.email) {
            const result = window.confirm('При измененнии электронной почты,' + 
                'будет осуществлен выход из личного кабинета. Вы уверены?')
            if (!result) {
                   this.setState({upd_user_data: true})
                   return false
                }
            }
        this.props.submit({
            username: this.state.username,
            email: this.state.email,
            first_name: this.state.first_name,
            last_name: this.state.last_name
        })
        this.setState({upd_user_data: true})
    }

    render = () => {
        if (!this.state.logged) {
            return <div className='centered-div-padding-10'>You are not logged in!</div>
        }
        else {
            return <div>
                <form className='profile-form' method="PUT" name='profile'>
                    <label className='profile-form__label'>
                        Логин:
                        <input className='profile-form__input' type='text' name='username' 
                                required onChange={this.handleChange}
                                value={this.state.username} />
                    </label>
                    <label className='profile-form__label'>
                        Емейл:
                        <input className='profile-form__input' type='email' 
                        name='email' required onChange={this.handleChange}
                        value={this.state.email} />
                    </label>
                    <label className='profile-form__label'>
                        Имя:
                        <input className='profile-form__input' type='text' 
                        name='first_name' onChange={this.handleChange}
                        value={this.state.first_name} />
                    </label>
                    <label className='profile-form__label'>
                        Фамилия:
                        <input className='profile-form__input' type='text' 
                        name='last_name' onChange={this.handleChange}
                        value={this.state.last_name} />
                    </label>
                    <label className='profile-form__label'>
                        Дата рождения:<br/>
                        <DatePicker
                            className='profile-form__input'
                            selected={ this.state.startDate }
                            onChange={ this.handleChangeTime }
                            name="startDate"
                            dateFormat="dd/MM/yyyy"
                            />
                    </label>
                    <div className="profile-form__buttons">
                        <input className='profile-form__submit' onClick={this.submitForm}
                            type="submit" value="Изменить данные"
                            disabled={!this.validateForm()} />
                    </div>
                    <Message success={this.props.success} errors={this.props.errors}/>
                </form>
                <div className='centered-div-padding-10'>
                    <a className='base-link' href='/'>Выйти из профиля</a>
                </div>
            </div>
        }
    }
}

export default ProfileForm