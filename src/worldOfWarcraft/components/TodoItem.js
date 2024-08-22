import React from 'react';

import classNames from 'classnames/bind';
import styles from '../../App.module.scss';
import { Checkbox, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CheckIcon from '@material-ui/icons/Check';
import { useDispatch } from 'react-redux';
import { setCheckProgress } from '../modules/slice';
import Accordion from '../../layout/components/Accordion';
import { toHtml } from '../../utils/stringUtils';

const cx = classNames.bind(styles);

const TodoItem = (props) => {

    const { item, rows } = props;
    const dispatch = useDispatch();

    const onClickToggleProgress = () => {
        let change = -1;
        if (item.playingProgress === 0) {
            change = 1;
        }
        dispatch(setCheckProgress({id: item.id, charId: item.charId, playingProgress: item.playingProgress + change, currentProgress: item.currentProgress + change, todoRows: rows}));
    }

    const onClickAddProgress = () => {
        if (item.maxProgress > item.currentProgress) {
            dispatch(setCheckProgress({id: item.id, charId: item.charId, playingProgress: item.playingProgress + 1, currentProgress: item.currentProgress + 1, todoRows: rows}));
        }
    }

    const onClickSubstractProgress = () => {
        if (0 < item.currentProgress) {
            dispatch(setCheckProgress({id: item.id, charId: item.charId, playingProgress: item.playingProgress - 1, currentProgress: item.currentProgress - 1, todoRows: rows}));
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
        <Accordion header={
            <div className={cx('wow-check-list-item-header')}>
                {item.maxProgress === 1
                    ? <Checkbox className={cx('wow-check-item-checkbox')} size="small" checked={item.playingProgress === item.maxProgress} onClick={() => onClickToggleProgress()}/>
                    : item.maxProgress >= 1 ? <span>
                        <IconButton className={cx('wow-check-item-button')} size="small" aria-label="plus" onClick={() => onClickAddProgress()}><AddIcon /></IconButton>
                        <IconButton className={cx('wow-check-item-button')} size="small" aria-label="minus" onClick={() => onClickSubstractProgress()}><RemoveIcon /></IconButton>
                    </span>
                    : <></>}
                <span className={cx('wow-check-item-frequency', item.frequency)}>
                    {item.frequency}
                </span>
                <span className={cx('wow-check-item-char-name', convertJobName(item.charJob))}>
                    {item.charName}
                </span>
                <span className={cx('wow-check-item-title')}>
                    {item.title} ({item.currentProgress}/{item.maxProgress})
                </span>
                {!!item.references &&
                    <a target="_blank" rel="noopener noreferrer" href={item.references} className={cx('wow-check-item-url-link')}>링크</a>
                }
                <span>
                    {item.playingProgress > 0 ? <CheckIcon color="action" /> : <></>}
                </span>
            </div>
        }>
            <div className={cx('wow-check-item-desc')} dangerouslySetInnerHTML={{__html: toHtml(item.description)}} />
        </Accordion>
    );
};

export default TodoItem;