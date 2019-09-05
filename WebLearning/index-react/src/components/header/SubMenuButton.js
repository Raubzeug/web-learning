import React from 'react';

const SubMenuButton = ({link, linkName}) => (
    <li className='navigation__button'>
        <a className="navigation__link" href={link}>{linkName}</a>
    </li>
)

export default SubMenuButton