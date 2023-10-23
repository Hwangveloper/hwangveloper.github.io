import React, { useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import useGoogleSheet from '../../libs/googlesheet';

const GameList = () => {

    const [data] = useGoogleSheet(process.env.REACT_APP_FIRST_SHEET_ID);
    const languageList = ['SheetID','MainCategory', 'SubCategory', 'Count'];
    const dispatch = useDispatch();

    const initApi = () => {
    };

    useEffect(() => {
        initApi();
        console.log("component did mount with useEffect!");
    }, []);

    return (
        <div>
            <h1>Game</h1>
            <h2>{data.map((row) => {
              return (<div>아이디: {row[languageList[0]]}, 설명: {row[languageList[1]]}</div>);
          })}</h2>
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