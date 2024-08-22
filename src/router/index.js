import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../layout/components/Header';
import Footer from '../layout/components/Footer';

import HomePage from '../home/pages/HomePage';
import WorldOfWarcraftPage from '../worldOfWarcraft/pages/WorldOfWarcraftPage';
import ProjectPage from '../project/pages/ProjectPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/wow" element={<WorldOfWarcraftPage />} />
                <Route path="/project" element={<ProjectPage />} />

                <Route path="*" element={<div>404 페이지를 찾을 수 없습니다.</div>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;