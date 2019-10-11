import React from 'react'
import { create } from 'react-test-renderer'

import Footer from '../components/footer'

describe('footer component', () => {
    test('Matches the snapshot', () => {
        const footer = create(<Footer />)
        expect(footer.toJSON()).toMatchSnapshot()

    })
})