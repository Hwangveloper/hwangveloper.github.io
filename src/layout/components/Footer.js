import React from 'react';

import classNames from 'classnames/bind';
import styles from '../../App.module.scss';

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <footer className={cx('footer')}>
            <h2 className={cx('footer-contents')}>My To do List</h2>
        </footer>
    );
}

export default Footer;