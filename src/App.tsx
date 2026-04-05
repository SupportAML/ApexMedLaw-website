import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { DivisionPage } from '@/pages/DivisionPage';
import { BlogPage } from '@/pages/BlogPage';
import { BlogPostPage } from '@/pages/BlogPostPage';
import { RegistryPage } from '@/pages/RegistryPage';
import { Footer } from '@/components/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/divisions/:slug" element={<DivisionPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/experts" element={<RegistryPage />} />
          <Route path="/registry" element={<Navigate to="/experts" replace />} />
          <Route path="/registry/*" element={<Navigate to="/experts" replace />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
