import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../../api/authService';
import { Wallet, LayoutDashboard, PieChart, ArrowRightLeft, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  // Helper for Nav Items
  const NavItem = ({ to, icon: Icon, label }) => (
    <Link 
      to={to} 
      className={`flex items-center px-4 py-2 rounded-lg text-sm font-bold transition-all ${
        isActive(to) 
          ? 'bg-green-50 text-green-700 shadow-sm border border-green-100' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </Link>
  );

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* LOGO */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="bg-green-600 p-2 rounded-lg mr-3 shadow-sm">
              <Wallet className="text-white h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">CapitalDeck</span>
          </div>

          {/* ACTIVE NAVIGATION LINKS */}
          <div className="hidden md:flex space-x-2 bg-white p-1 rounded-xl">
            <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem to="/analytics" icon={PieChart} label="Analytics" />
            <NavItem to="/transactions" icon={ArrowRightLeft} label="Transactions" />
          </div>

          {/* USER PROFILE */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-sm font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <User className="w-4 h-4 mr-2 text-gray-500" />
              <span className="hidden sm:block">{user ? user.fullName : 'User'}</span>
            </div>
            
            <button 
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;