import React from 'react';
import WorkList from './WorkList';
import GameList from './GameList';

const Home = () => {
    return (
        <ul>
            <li>
                <WorkList />
            </li>
            <li>
                <GameList />
            </li>
        </ul>
    );
};

export default Home;