import React from 'react';

const Header = () => {
    return (
        <header className='header'>
            <div className='contents'>
                <div>
                    <img className='logo' alt='logo' src='images/slime.png' width='80' height='80' />
                </div>

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