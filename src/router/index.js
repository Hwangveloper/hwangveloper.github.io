import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '../home/pages/HomePage';
import DetailPage from '../detail/pages/DetailPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/detail" element={<DetailPage />} />

                <Route path="*" element={<div>404 페이지를 찾을 수 없습니다.</div>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;