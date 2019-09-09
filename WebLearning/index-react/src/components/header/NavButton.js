import React from 'react';
import SubMenu from './SubMenu.js'

const NavButton = ({link, linkName, children}) => {
    return <li className='navigation__button'>
        <a className="navigation__link" href={link}>{linkName}</a>
        {children && <SubMenu elements={children} />
        }
    </li>
    }

export default NavButton