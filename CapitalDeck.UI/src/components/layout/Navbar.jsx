import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, PieChart, Wallet, UserCircle } from 'lucide-react';

const Navbar = () => {
  return (
    // <nav>: Semantic HTML5 tag. Better for SEO and Screen Readers than <div>.
    // fixed: Sticks to the top even when scrolling.
    // z-50: Ensures it floats ABOVE everything else (Z-Index).
    // backdrop-blur-md: The "Frosted Glass" effect (Apple/Zerodha style).
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      
      {/* Container limits the width so it doesn't stretch on ultra-wide monitors */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Flex container to separate Logo (Left) and Menu (Right) */}
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO SECTION */}
          <div className="flex items-center">
            {/* The Green 'Money' Icon */}
            <div className="bg-green-600 p-1.5 rounded-lg mr-3">
               <Wallet className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Capital<span className="text-green-600">Deck</span>
            </span>
          </div>

          {/* MENU LINKS SECTION (Hidden on mobile 'hidden md:flex') */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" icon={<LayoutDashboard size={18} />} text="Dashboard" active />
            <NavLink to="/analytics" icon={<PieChart size={18} />} text="Analytics" />
            <NavLink to="/transactions" icon={<Wallet size={18} />} text="Transactions" />
            
            {/* PROFILE SECTION */}
            <div className="border-l border-gray-300 pl-8 ml-8">
              <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                <UserCircle size={20} />
                <span>Kaushal L.</span>
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

// Helper Component for consistent links
// We separate this to keep the main code clean
const NavLink = ({ to, icon, text, active = false }) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 
      ${active ? 'text-green-700 bg-green-50 px-3 py-2 rounded-md' : 'text-gray-600 hover:text-green-600'}`}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navbar;