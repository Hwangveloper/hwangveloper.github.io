import React, { useRef, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import classNames from 'classnames/bind';
import styles from '../../App.module.scss';

const cx = classNames.bind(styles);

const Accordion = (props) => {

    const wrapperRef = useRef(null);
    const childRef = useRef(null);

    const { header, children } = props;
    const [open, setOpen] = useState(false);

    const handleToggleOpen = (open) => {
        if (wrapperRef === null || childRef === null) {
            return;
        }
        if (open) {
            wrapperRef.current.style.height = `${childRef.current.clientHeight}px`;
        } else {
            wrapperRef.current.style.height = "0";
        }
        setOpen(open);
    }
    
    return (
        <div className={cx('accordion-view')}>
            <div className={cx('accordion-header-view')} onClick={() => handleToggleOpen(!open)}>{header}<ExpandMoreIcon className={cx("accordion-arrow", open ? "is-open" : "")} /></div>
            <div className={cx('accordion-wrapper')} ref={wrapperRef}>
                <div className={cx('accordion-content')} ref={childRef}>{children}</div>
            </div>
        </div>
    );
};

export default Accordion;