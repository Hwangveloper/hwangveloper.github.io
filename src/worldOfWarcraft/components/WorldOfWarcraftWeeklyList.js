import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTableProgress } from '../modules/slice';

import classNames from 'classnames/bind';
import styles from '../../App.module.scss';

const cx = classNames.bind(styles);

const WorldOfWarcraftWeeklyList = () => {

    const { weeklyColumns, weeklyRows, todoRows } = useSelector(state => state.wow);
    const dispatch = useDispatch();

    const onClickAddProgress = (column, row) => {
        if (row[column.id].maxProgress > row[column.id].currentProgress) {
            dispatch(setTableProgress({id: column.id, charId: row.charId, currentProgress: row[column.id].currentProgress + 1, playingProgress: row[column.id].playingProgress + 1, todoRows}));
        }
    }

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
        <div className={cx('wow-weekly-list-view')}>
            <table>
                <thead>
                    <tr>
                        <th key="0">이름</th>
                        {weeklyColumns.map((column) => {
                            return <th key={column.id}>{column.title}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {weeklyRows.map((row) => {
                        return <tr key={row.charId} className={cx('wow-weekly-table-row')}>
                            <td key="0" className={cx(convertJobName(row.charJob))}>
                                {row.charName}
                            </td>
                            {weeklyColumns.map((column) => {
                                return <td key={column.id} className={cx(row[column.id].currentProgress === row[column.id].maxProgress ? 'complete' : 'incomplete', convertJobName(row.charJob))} onClick={() => onClickAddProgress(column, row)}>
                                    <Fragment>
                                        {!!row[column.id].description ? row[column.id].description + " " : ""}{row[column.id].currentProgress}/{row[column.id].maxProgress}
                                    </Fragment>
                                </td>;
                            })}
                        </tr>;
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default WorldOfWarcraftWeeklyList;