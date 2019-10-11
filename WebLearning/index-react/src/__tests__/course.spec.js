import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import Course from '../components/Course'

describe('course component', () => {
    test('renders properly', () => {
        const wrapper = shallow(<Course course={{
                    name: 'mockName',
                    lang: 'mockLang',
                    img: 'mockPic',
                    caption: 'mockCap',
                    url: 'mockUrl'
                }}/>)
        const heading = wrapper.find('.course-heading').first().text()
        const link = wrapper.find('.course-info-button').first().prop('href')
        expect(shallowToJson(wrapper)).toMatchSnapshot()
        expect(heading).toEqual('mockName')
        expect(link).toContain('mockUrl')
    })
})