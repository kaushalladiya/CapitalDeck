import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/common/Navbar';
import AuthService from './api/authService';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedLayout = ({ children }) => {
  const user = AuthService.getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-gray-50 font-mono text-gray-900 flex flex-col">
      <Navbar /> 
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* FULLY FUNCTIONAL ROUTES */}
        <Route path="/dashboard" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
        <Route path="/analytics" element={<ProtectedLayout><Analytics /></ProtectedLayout>} />
        <Route path="/transactions" element={<ProtectedLayout><Transactions /></ProtectedLayout>} />
        <Route path="/admin" element={<ProtectedLayout><AdminDashboard /></ProtectedLayout>} />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;