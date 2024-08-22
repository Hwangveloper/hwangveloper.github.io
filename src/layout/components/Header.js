import React from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from '../../App.module.scss';

const cx = classNames.bind(styles);

const Header = () => {
    return (
        <header className={cx('header')}>
            <div className={cx('header-contents')}>
                <Link to="/">
                    <div>
                        <img className={cx('header-logo')} alt='logo' src='images/slime.png' width='80' height='80' />
                    </div>
                </Link>

                <nav className={cx('header-navigation-bar')}>
                    <ul>
                        <li><Link to="/wow">WoW</Link></li>
                        <li><Link to="/projects">Projects</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;