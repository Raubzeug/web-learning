import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import LoginForm from '../components/login-page/LoginForm'

describe('Login form tests', () => {
    const mockLogin = jest.fn()
        const props = {
            submit: mockLogin
        } 
    const wrapper = shallow(
        <LoginForm {...props}/>
    )
    const initialState = {
        username: '',
        password: ''
    }
    
    beforeEach(() => {
        wrapper.setState(initialState)
    })
    it('default renders properly', () => {
        expect(toJson(wrapper)).toMatchSnapshot()
    })
    it('handle state username', () => {
        wrapper.find('input[type="text"]').simulate('change', {
            target: {name: 'username', value: 'testuser'}})
        expect(wrapper.state().username).toEqual('testuser')
    })
    it('handle state password', () => {
        wrapper.find('input[type="password"]').simulate('change', {
            target: {name: 'password', value: 'testpass'}})
        expect(wrapper.state().password).toEqual('testpass')
    })
    it('form validation', () => {     
        wrapper.find('input[type="text"]').simulate('change', {
            target: {name: 'username', value: 'tes'}})
        wrapper.find('input[type="password"]').simulate('change', {
            target: {name: 'password', value: 'tes'}})
        expect(wrapper.find('.login-form__submit').first().prop('disabled')).toEqual(true)
        wrapper.find('input[type="text"]').simulate('change', {
            target: {name: 'username', value: 'tes'}})
        wrapper.find('input[type="password"]').simulate('change', {
            target: {name: 'password', value: 'testpas'}})
        expect(wrapper.find('.login-form__submit').first().prop('disabled')).toEqual(true)
        wrapper.find('input[type="text"]').simulate('change', {
            target: {name: 'username', value: 'testuser'}})
        wrapper.find('input[type="password"]').simulate('change', {
            target: {name: 'password', value: 'tes'}})
        expect(wrapper.find('.login-form__submit').first().prop('disabled')).toEqual(true)
        wrapper.find('input[type="text"]').simulate('change', {
            target: {name: 'username', value: 'testuser'},})
        wrapper.find('input[type="password"]').simulate('change', {
            target: {name: 'password', value: 'testpas'}})
        expect(wrapper.find('.login-form__submit').first().prop('disabled')).toEqual(false)
    })
    it('submitting form', () => {
        wrapper.find('input[type="text"]').simulate('change', {
            target: {name: 'username', value: 'testuser'},})
        wrapper.find('input[type="password"]').simulate('change', {
            target: {name: 'password', value: 'testpas'}})
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {}
        })
        expect(mockLogin).toHaveBeenCalledTimes(1)
    })
    it('when clicking login button', () => {
        wrapper.find('input[type="text"]').simulate('change', {
            target: {name: 'username', value: 'testuser'},})
        wrapper.find('input[type="password"]').simulate('change', {
            target: {name: 'password', value: 'testpas'}})
        wrapper.find('.login-form__submit').simulate('click', {
            preventDefault: () => {}
        })
        expect(mockLogin).toHaveBeenCalledTimes(2)
    })
})