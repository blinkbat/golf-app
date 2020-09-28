


import React from 'react';
import { Link } from 'react-router-dom';

import bgImg from './bg-img.jpg';
import logo from './windwatch-logo.png';

const Nav = () => {

    return( 
        
        <nav>
            <div style={{ 
                background: `url( ${ bgImg } )`, 
                height: '200px',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <img 
                    src={ logo } 
                    style={{ maxWidth: '300px', filter: 'drop-shadow(1px 3px 3px #222)' }} 
                    alt="WindWatch" 
                />
            </div>
        
            <ul className="ui four item menu" style={{ margin: 0 }}>

                <li className="item ui big header">
                    <Link to="/food" style={{ width: '100%' }}>
                        Food
                    </Link>
                </li>

                <li className="item ui big header">
                    <Link to="/beverage" style={{ width: '100%' }}>
                        Beverage
                    </Link>
                </li>

                <li className="item ui big header">
                    <Link to="/pro" style={{ width: '100%' }}>
                        Pro
                    </Link>
                </li>

                <li className="item ui big header">
                    <Link to="/cart" style={{ width: '100%' }}>
                        Cart
                    </Link>
                </li>

            </ul>
        </nav>
    );

};

export default Nav;