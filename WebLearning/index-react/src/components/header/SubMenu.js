import React from 'react';
import NavButton from './NavButton.js';


const SubMenu = ({elements}) => (
    <ul className='navigation__sub-menu'>
        {elements.map((element, index) => (
            <NavButton key={index} link={element.link} linkName={element.linkName} />
            )
            )}
    </ul>
)

export default SubMenu