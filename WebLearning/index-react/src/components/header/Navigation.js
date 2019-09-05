import React from 'react';
import NavButton from './NavButton.js';

const LINKS = [
    {link: '/index.html', linkName: 'HOME'},
    {link: '/about.html', linkName: 'ABOUT US'},
    {link: '/courses.html', linkName: 'COURSES', children: [
            {link: '/schedule.html', linkName: 'SCHEDULE'}
        ]
    },
    {link: '/tutors.html', linkName: 'TUTORS'},
    {link: '/contacts.html', linkName: 'CONTACTS'},

]

const Navigation = () => (
    <ul className='navigation'>
        {LINKS.map((element, index) => (
            <NavButton key={index} link={element.link} linkName={element.linkName} 
            children={element.children} />
            )
            )}
    </ul>

)

export default Navigation