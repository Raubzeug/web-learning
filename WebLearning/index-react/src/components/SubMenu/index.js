import React from 'react';
import NavButton from '../NavButton';
import './submenu.less'


const SubMenu = ({elements}) => (
    <ul className='navsubmenu'>
        {elements.map((element, index) => (
            <NavButton key={index} link={element.link} linkName={element.linkName} />
            )
            )}
    </ul>
)

export default SubMenu