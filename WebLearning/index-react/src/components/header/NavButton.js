import React from 'react';
import SubMenu from './SubMenu.js'
import { Link } from 'react-router-dom'

const NavButton = ({link, linkName, children}) => {
    return <li className='navigation__button'>
        <Link className="navigation__link" to={link}>{linkName}</Link>
        {children && <SubMenu elements={children} />
        }
    </li>
    }

export default NavButton