import React from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import classNames from 'classnames/bind';
import styles from '../../App.module.scss';

const cx = classNames.bind(styles);

const Loading = (props) => {
    const check = props.loading == null ? false : props.loading;
    
    return (
        check ? <div className={cx("network-loading-panel")} style={{display: 'block'}}>
            <div className={cx("network-loading-background")} />
            <div className={cx("network-loading-icon")}>
                <BeatLoader color="#15D474" loading={props.loading} size={15} />
            </div>
        </div> : <></>
    )
};

export default Loading;
