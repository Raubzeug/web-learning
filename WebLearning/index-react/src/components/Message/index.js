import React from 'react';
import './message.less'

const Message = ({success, errors}) => {
    return (
    <span>
    {success && <div className='message message--green'>{success}</div>}
    {errors && 
        <div className='message message--red'>
            {errors.map(item => <p key={item}>{item}</p>)}
        </div>}
    </span>)
}

export default Message