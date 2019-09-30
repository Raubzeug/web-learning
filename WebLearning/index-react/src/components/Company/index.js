import React from 'react';
import './company.less'

const Company = ({name, img}) => (
    <div className="company">
        <a className="company-logo" href="/#">
            <img src={img} alt={name}/>
        </a>
        <div className="company-name">
            {name}
        </div>
    </div>
)

export default Company