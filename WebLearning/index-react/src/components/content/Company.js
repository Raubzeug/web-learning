import React from 'react';

const Company = ({name, img}) => (
    <div className="company">
        <a className="company-logo" href="/#">
            <img src={require('../../images/' + img)} alt={name}/>
        </a>
        <div className="company-name">
            {name}
        </div>
    </div>
)

export default Company