import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getSheetList, getTodoList } from '../modules/slice';

const TodoList = () => {

    const { sheetList, todoList } = useSelector(state => state.home);
    const languageList = ['SheetID','MainCategory', 'SubCategory', 'Count'];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSheetList());
    }, [dispatch]);

    useEffect(() => {
        for (var sheet in sheetList) {
            const sheetId = sheet['SheetID'];
            const sheetName = sheet['SubCategory'];
            dispatch(getTodoList(sheetId, sheetName));
        }
    }, [dispatch, sheetList]);

    return (
        <div>
            <h1>Game</h1>
            <h2>
                {
                    console.log(todoList)
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

export default TodoList;