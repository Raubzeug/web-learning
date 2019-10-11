import React from 'react'
import { shallow } from 'enzyme'

import { UserProfile } from '../components/user-profile'

describe('UserProfile component tests', () => {
    it('default renders properly NOT tutor', () => {
        const wrapper = shallow(
            <UserProfile is_tutor={false} />
        )
        expect(wrapper.find('.content__submenu_button').at(1).text())
            .toEqual('Мое расписание')
        expect(wrapper.find('PersonalData').length).toEqual(1)
    })
    it('default renders properly IS tutor', () => {
        const wrapper = shallow(
            <UserProfile is_tutor={true} />
        )
        expect(wrapper.find('.content__submenu_button').at(1).text())
            .toEqual('Ведомость учеников')
        expect(wrapper.find('PersonalData').length).toEqual(1)
    })
    it('should handle state changes NOT tutor', () => {
        const wrapper = shallow(
            <UserProfile />
        )
        const profile = wrapper.find('.content__submenu_button').at(0)
        const schedule = wrapper.find('.content__submenu_button').at(1)
        expect(wrapper.state().showPrivat).toEqual(true)
        expect(wrapper.state().showSchedule).toEqual(false)
        schedule.simulate('click')
        expect(wrapper.state().showPrivat).toEqual(false)
        expect(wrapper.state().showSchedule).toEqual(true)
        expect(wrapper.find('PersonalData').length).toEqual(0)
        expect(wrapper.find('PersonalSchedule').length).toEqual(1)
        profile.simulate('click')
        expect(wrapper.state().showPrivat).toEqual(true)
        expect(wrapper.state().showSchedule).toEqual(false)
        expect(wrapper.find('PersonalData').length).toEqual(1)
        expect(wrapper.find('PersonalSchedule').length).toEqual(0)
    })
    it('should handle state changes IS tutor', () => {
        const wrapper = shallow(
            <UserProfile is_tutor={true} />
        )
        const profile = wrapper.find('.content__submenu_button').at(0)
        const schedule = wrapper.find('.content__submenu_button').at(1)
        expect(wrapper.state().showPrivat).toEqual(true)
        expect(wrapper.state().showSchedule).toEqual(false)
        schedule.simulate('click')
        expect(wrapper.state().showPrivat).toEqual(false)
        expect(wrapper.state().showSchedule).toEqual(true)
        expect(wrapper.find('PersonalData').length).toEqual(0)
        expect(wrapper.find('PersonalStatement').length).toEqual(1)
        profile.simulate('click')
        expect(wrapper.state().showPrivat).toEqual(true)
        expect(wrapper.state().showSchedule).toEqual(false)
        expect(wrapper.find('PersonalData').length).toEqual(1)
        expect(wrapper.find('PersonalStatement').length).toEqual(0)
    })
})