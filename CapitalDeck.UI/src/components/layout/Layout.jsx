import React from 'react';
import Navbar from './Navbar';

// 'children' is a special React prop. 
// It represents whatever content we put INSIDE the <Layout>...</Layout> tags.
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* The Navbar stays fixed at the top */}
      <Navbar />

      {/* Main Content Area */}
      {/* pt-20: Padding Top 20 (5rem). We need this because the Navbar is 'fixed' 
          and would otherwise cover the top of our content. */}
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;