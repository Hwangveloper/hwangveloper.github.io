import React from 'react';

import classNames from 'classnames/bind';
import styles from '../../App.module.scss';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

const cx = classNames.bind(styles);

const WorldOfWarcraftDailyList = () => {

    const { todoList } = useSelector(state => state.wow);

    return (
        <div className={cx('wow-daily-list-view')}>
            <h3>일일 리스트</h3>
            <ul className={cx('wow-daily-list')}>
                {todoList.map((row) => {
                    return <li key={row.id}><TodoItem item={row} /></li>
                })}
            </ul>
        </div>
    );
};

export default WorldOfWarcraftDailyList;