import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../layout/components/Header';
import Footer from '../layout/components/Footer';

import HomePage from '../home/pages/HomePage';
import DetailPage from '../detail/pages/DetailPage';
import WorldOfWarcraftPage from '../worldOfWarcraft/pages/WorldOfWarcraftPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/wow" element={<WorldOfWarcraftPage />} />
                <Route path="/detail" element={<DetailPage />} />

                <Route path="*" element={<div>404 페이지를 찾을 수 없습니다.</div>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;