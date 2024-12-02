import React from 'react';
import PropTypes from 'prop-types';

import { generateAvatarFromHash } from 'utils/helpers'

import './Avatar.scss'

const Avatar =  ({user}) => {
    if(user.avatar) {
        return (
            <img className="avatar" src={user.avatar} alt= { `Avatar: ${user.username}` }/>
        );
    } else {
        // make avatar
        
        const {color, colorLighten} = generateAvatarFromHash(user._id);
        const firstChar = user.username[0];

        return (
            <div style={{ 
                background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`,
            }} 
            className="avatar avatar--symbol">
                {firstChar}
            </div>
        )
    }
};

Avatar.propTypes = {
    className: PropTypes.string
}

export default Avatar;