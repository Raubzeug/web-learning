import React from 'react';
import SubMenu from '../SubMenu'
import { Link } from 'react-router-dom'
import './navbutton.less'

const NavButton = ({link, linkName, children}) => {
    return <li className='navbutton'>
        <Link className="navbutton__link" to={link}>{linkName}</Link>
        {children && <SubMenu elements={children} />
        }
    </li>
    }

export default NavButton