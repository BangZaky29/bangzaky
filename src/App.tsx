
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import TemplateDetail from './pages/TemplateDetail';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import { CustomCursor } from './components/ui/CustomCursor';

const App: React.FC = () => {
  return (
    <Router>
      <CustomCursor />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Marketplace />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/template/:id" element={<TemplateDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
