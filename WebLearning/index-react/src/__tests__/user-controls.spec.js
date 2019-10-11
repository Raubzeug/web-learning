import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import toJson from 'enzyme-to-json'
import { UserControls } from '../components/user-controls'


describe('UserControls test', () => {
    it('should render properly NOT logged_in', () => {
        const wrapper = mount(
            <Router>
                <UserControls />
            </Router>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
        wrapper.unmount()
    })
    it('should render properly logged_in', () => {
        localStorage.setItem('logged_in', true)
        const wrapper = mount(
            <Router>
                <UserControls />
            </Router>
        )
        expect(toJson(wrapper)).toMatchSnapshot()
        wrapper.unmount()
    })
})