import React from 'react';
import './css/logo.css';
import holy from './holy_mountain.jpg';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <div className="Tilt-inner">
                <img className="center-image" alt='logo' src={ holy } style={{ height: 300, width: 300 }} />
            </div>
        </div>
    )
}

export default Logo;