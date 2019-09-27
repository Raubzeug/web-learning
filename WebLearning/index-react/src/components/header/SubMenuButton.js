import React from 'react';
import { Link } from 'react-router-dom'
 
const SubMenuButton = ({link, linkName}) => (
    <li className='navigation__button'>
        <Link className="navigation__link" to={link}>{linkName}</Link>
    </li>
)

export default SubMenuButton