import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ArticlePage } from '../pages/ArticlePage';
import { EditArticlePage } from '../pages/EditArticlePage';
import { HomePage } from '../pages/HomePage';
import { SectionPage } from '../pages/SectionPage';
import { UploadPage } from '../pages/UploadPage';

export const AppRoutes: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/section/:id" element={<SectionPage />} />
      <Route path="/article/:id" element={<ArticlePage />} />
      <Route path="/article/:id/edit" element={<EditArticlePage />} />
      <Route path="/upload" element={<UploadPage />} />
    </Routes>
  </Layout>
);
