import React from 'react';
import WorkList from './WorkList';
import TodoList from './TodoList';

const Home = () => {
    return (
        <ul>
            <li>
                <TodoList />
            </li>
            <li>
                <WorkList />
            </li>
        </ul>
    );
};

export default Home;