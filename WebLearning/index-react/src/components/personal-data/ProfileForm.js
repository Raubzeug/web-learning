import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Message from '../Message'

import { connect } from 'react-redux'
import { getUserInfo } from '../../redux/actions/'
import {Link} from 'react-router-dom'

export class ProfileForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            first_name: '', 
            last_name: '',
            upd_user_data: false,
            startDate: new Date(1986,8,19),
        }
    }

    validateForm = () => (
        (this.state.username || this.state.email || this.state.last_name || this.state.first_name) &&
        (!this.state.username || this.state.username.length > 3) &&
        (!this.state.email || this.state.email.includes('@'))
    )

    componentDidMount = () => {
        if (this.props.user_info.length === 0) {
            this.props.getUserInfo()
        }        
    }

    shouldComponentUpdate = () => {
        if (this.state.upd_user_data) {
            this.props.getUserInfo()
            this.setState({
                username: '',
                email: '',
                first_name: '', 
                last_name: '',
                upd_user_data: false})
        }
        return true
    }

    handleChange = ({target: {name, value}}) => this.setState({ [name]: value })

    handleChangeTime =(date) => (
        this.setState({
        startDate: date
        })
      )

    submitForm = event => {
        event.preventDefault()
        
        const d = new Date();
        d.setDate(d.getDate() - 365*16);
        if (this.state.startDate > d) {
            alert('You must be older then 16 years old!')
        }

        if (this.state.email && this.props.user_info.email !== this.state.email) {
            const result = window.confirm('При измененнии электронной почты,' + 
                'будет осуществлен выход из личного кабинета. Вы уверены?')
            if (!result) {
                //    this.setState({email: ''})
                   return false
                }
            }
        this.props.submit({
            username: this.state.username || this.props.user_info.username,
            email: this.state.email || this.props.user_info.email,
            first_name: this.state.first_name || this.props.user_info.first_name,
            last_name: this.state.last_name || this.props.user_info.last_name
        })
        this.setState({upd_user_data: true})
    }

    render = () => {
        if (!localStorage.logged_in) {
            return <div className='centered-div-padding-10'>You are not logged in!</div>
        }
        else {
            return <div>
                <form className='profile-form' method="PUT" name='profile'>
                    <label className='profile-form__label'>
                        Логин: <b>{this.props.user_info.username}</b>
                        <input className='profile-form__input' type='text' name='username' 
                                required onChange={this.handleChange}
                                value={this.state.username} />
                    </label>
                    <label className='profile-form__label'>
                        Емейл: <b>{this.props.user_info.email}</b>
                        <input className='profile-form__input' type='email' 
                        name='email' required onChange={this.handleChange}
                        value={this.state.email} />
                    </label>
                    <label className='profile-form__label'>
                        Имя: <b>{this.props.user_info.first_name}</b>
                        <input className='profile-form__input' type='text' 
                        name='first_name' onChange={this.handleChange}
                        value={this.state.first_name} />
                    </label>
                    <label className='profile-form__label'>
                        Фамилия: <b>{this.props.user_info.last_name}</b>
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
                    <Link className='base-link' to='/'>Выйти из профиля</Link>
                </div>
            </div>
        }
    }
}

const mapStateToProps = (state) => {
    return {
      user_info: state.user_info
    };
  }

export default connect(
    mapStateToProps,
    { getUserInfo }
)(ProfileForm)