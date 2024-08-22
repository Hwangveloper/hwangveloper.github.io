import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../layout/components/Loading';
import WorldOfWarcraftCheckList from '../components/WorldOfWarcraftCheckList';
import WorldOfWarcraftWeeklyList from '../components/WorldOfWarcraftWeeklyList';
import { initAndgetWowTodoList } from '../modules/slice';

import classNames from 'classnames/bind';
import styles from '../../App.module.scss';

const cx = classNames.bind(styles);

const WorldOfWarcraftPage = () => {

    const { loading } = useSelector(state => state.wow);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initAndgetWowTodoList());
    }, [dispatch]);

    return (
        <div className={cx('body-layout')}>
            <ul className={cx('wow-layout-view')}>
                <li><WorldOfWarcraftWeeklyList /></li>
                <li><WorldOfWarcraftCheckList /></li>
            </ul>
            <Loading loading={loading}/>
        </div>
    );
};

export default WorldOfWarcraftPage;