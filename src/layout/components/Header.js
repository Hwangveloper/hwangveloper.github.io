import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='header'>
            <div className='contents'>
                <Link to="/">
                    <div>
                        <img className='logo' alt='logo' src='images/slime.png' width='80' height='80' />
                    </div>
                </Link>

                <nav className='navigation'>
                    <ul>
                        <li>메뉴1</li>
                        <li>메뉴2</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;