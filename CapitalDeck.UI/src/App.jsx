import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* We now render the actual Dashboard component */}
          <Route path="/" element={<Dashboard />} />
          
          {/* Placeholders for future pages */}
          <Route path="/analytics" element={<div className="p-4">Analytics Component</div>} />
          <Route path="/transactions" element={<div className="p-4">Transactions Component</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;