import React from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from '../../App.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const WorldOfWarcraftDailyList = () => {

    const { todoList } = useSelector(state => state.wow);

    return (
        <div className={cx('wow-daily-list-view')}>
            <h2>일일 리스트</h2>
            <ul>
                <li>
                    
                </li>
            </ul>
        </div>
    );
};

export default WorldOfWarcraftDailyList;