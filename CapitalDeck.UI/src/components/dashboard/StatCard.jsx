import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Props Explanation (for Interview):
// title: "Total Balance", "Income", etc.
// amount: The money value.
// icon: The Lucide icon component.
// trend: "up" or "down" (determines color).
// trendValue: The percentage change (e.g., "+12%").
// isPrimary: If true, styles this card as the "Hero" card (Gradient).

const StatCard = ({ title, amount, icon: Icon, trend, trendValue, isPrimary = false }) => {
  
  // Helper to format money professionally (Indian Rupee)
  // Interview Tip: Never hardcode currency symbols. Use Intl.NumberFormat.
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className={`p-6 rounded-2xl shadow-sm border transition-all duration-200 hover:shadow-md
      ${isPrimary 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white border-transparent' 
        : 'bg-white text-gray-900 border-gray-200'
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-medium mb-1 ${isPrimary ? 'text-gray-400' : 'text-gray-500'}`}>
            {title}
          </p>
          <h3 className="text-3xl font-bold tracking-tight font-mono">
            {formatCurrency(amount)}
          </h3>
        </div>
        
        {/* Icon Container */}
        <div className={`p-3 rounded-xl ${isPrimary ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
          <Icon size={24} className={isPrimary ? 'text-green-400' : 'text-gray-700'} />
        </div>
      </div>

      {/* Trend Indicator Section */}
      <div className="mt-4 flex items-center text-sm">
        <span className={`flex items-center font-medium px-2 py-0.5 rounded-full
          ${trend === 'up' 
            ? 'text-green-600 bg-green-100' 
            : 'text-red-600 bg-red-100'
          }`}
        >
          {trend === 'up' ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
          {trendValue}
        </span>
        <span className={`ml-2 ${isPrimary ? 'text-gray-400' : 'text-gray-500'}`}>
          vs last month
        </span>
      </div>
    </div>
  );
};

export default StatCard;