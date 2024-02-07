import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getTodoList } from '../modules/slice';

const GameList = () => {

    const { todoList = [] } = useSelector(state => state.home);
    const columnList = ['SheetID','MainCategory', 'SubCategory', 'Count'];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodoList());
    }, []);

    return (
        <div>
            <h1>Game</h1>
            <h2>
                {
                    todoList.map((row) => {
                    return (<div>아이디: {row[columnList[0]]}, 설명: {row[columnList[3]]}</div>);
                    })
                }
            </h2>
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

export default GameList;