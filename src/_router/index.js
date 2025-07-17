import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../common/_components/Header';
import Footer from '../common/_components/Footer';

import HomePage from '../_pages/home/HomePage';
import WowPage from '../_pages/wow/WowPage';
import ProjectPage from '../_pages/project/ProjectPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/wow" element={<WowPage />} />
        <Route path="/project" element={<ProjectPage />} />

        <Route path="*" element={<div>404 페이지를 찾을 수 없습니다.</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;