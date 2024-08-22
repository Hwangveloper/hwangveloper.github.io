import React from 'react';

import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import classNames from 'classnames/bind';
import styles from '../../App.module.scss';

const cx = classNames.bind(styles);

const WorldOfWarcraftCheckList = () => {

    const { checkList, todoRows } = useSelector(state => state.wow);

    const convertJobName = (jobName) => {
        switch (jobName) {
            case '죽음의 기사': return 'death-knight';
            case '악마사냥꾼': return 'demon-hunter';
            case '드루이드': return 'druid';
            case '기원사': return 'evoker';
            case '사냥꾼': return 'hunter';
            case '마법사': return 'mage';
            case '수도사': return 'monk';
            case '성기사': return 'paladin';
            case '사제': return 'priest';
            case '도적': return 'rogue';
            case '주술사': return 'shaman';
            case '흑마법사': return 'warlock';
            case '전사': return 'warrior';
            default: break;
        }

        return '';
    }

    return (
        <div className={cx('wow-check-list-view')}>
            <h3 className={cx('wow-check-list-title')}>체크 리스트</h3>
            <ul className={cx('wow-check-list')}>
                {checkList.map((row) => {
                    return <li key={`${row.id}${row.charId}`} className={cx('wow-check-list-item', convertJobName(row.charJob))}><TodoItem item={row} rows={todoRows} /></li>
                })}
            </ul>
        </div>
    );
};

export default WorldOfWarcraftCheckList;