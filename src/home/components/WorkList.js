import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {increase, decrease} from '../modules/actions';

const WorkList = () => {

    const {count} = useSelector(state => state.home);
    const dispatch = useDispatch();

    const increaseCounter = () => {
        dispatch(increase());
    };

    const decreaseCounter = () => {
        dispatch(decrease());
    };

    return (
        <div>
            <h1>Work</h1>
            <ul>
                <li className="todo stack-small">
                    <div className="c-cb">
                        <input id="todo-2" type="checkbox" />
                        <label className="todo-label" htmlFor="todo-2">
                        Repeat
                        </label>
                    </div>
                    <div className="btn-group">
                        <button type="button" className="btn">
                        Edit <span className="visually-hidden">Repeat</span>
                        </button>
                        <button type="button" className="btn btn__danger">
                        Delete <span className="visually-hidden">Repeat</span>
                        </button>
                    </div>
                </li>
                <li className="todo stack-small">
                    <div className="c-cb">
                        <input id="todo-2" type="checkbox" />
                        <label className="todo-label" htmlFor="todo-2">
                        Repeat
                        </label>
                    </div>
                    <div className="btn-group">
                        <button type="button" className="btn">
                        Edit <span className="visually-hidden">Repeat</span>
                        </button>
                        <button type="button" className="btn btn__danger">
                        Delete <span className="visually-hidden">Repeat</span>
                        </button>
                    </div>
                </li>
                <li className="todo stack-small">
                    <div className="c-cb">
                        <input id="todo-2" type="checkbox" />
                        <label className="todo-label" htmlFor="todo-2">
                        Repeat
                        </label>
                    </div>
                    <div className="btn-group">
                        <button type="button" className="btn">
                        Edit <span className="visually-hidden">Repeat</span>
                        </button>
                        <button type="button" className="btn btn__danger">
                        Delete <span className="visually-hidden">Repeat</span>
                        </button>
                    </div>
                </li>
                <li className="todo stack-small">
                    <div className="c-cb">
                        <input id="todo-2" type="checkbox" />
                        <label className="todo-label" htmlFor="todo-2">
                        Repeat
                        </label>
                    </div>
                    <div className="btn-group">
                        <button type="button" className="btn">
                        Edit <span className="visually-hidden">Repeat</span>
                        </button>
                        <button type="button" className="btn btn__danger">
                        Delete <span className="visually-hidden">Repeat</span>
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default WorkList;