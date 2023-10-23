import React from 'react';
import { Link } from 'react-router-dom';

const WorkList = () => {

    return (
        <div>
            <Link to="/detail"><h1>Work</h1></Link>
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