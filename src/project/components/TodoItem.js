import React from 'react';

import classNames from 'classnames/bind';
import styles from '../../App.module.scss';
import { Checkbox, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { setTodoProgress } from '../modules/slice';

const cx = classNames.bind(styles);

const TodoItem = (props) => {

    const { item } = props;
    const dispatch = useDispatch();

    return (
        <div className={cx('wow-daily-list-item')}>
        </div>
    );
};

export default TodoItem;